let gulp = require('gulp');
let through = require('through2');
let concat = require('gulp-concat');
let htmlmin = require('gulp-htmlmin');
let batchReplace = require('gulp-batch-replace');
let uglify = require('gulp-uglify-es').default;
let rm = require( 'gulp-rm' );
let fs = require('fs');
let runSeq = require('run-sequence');

runSeq.use(gulp);

runSeq.options.ignoreUndefinedTasks = true;
runSeq.options.showErrorStackTrace = true;

let gzip = require('gulp-gzip');

let jsonminify = require('gulp-jsonminify');
let minifyCss = require('gulp-minify-css');

let rev = require('gulp-rev');
let revdel = require('gulp-rev-delete-original');


gulp.task('clean', function() {
    gulp.src('./dist/**/*', { read: false })
        .pipe( rm({ async: false }));

    gulp.src('./rev-manifest.json', { read: false })
        .pipe( rm({ async: false }));
});

gulp.task('default', ['fonts', 'webfonts', 'img', 'jsons', 'styles', 'scripts', 'html'], function() {});

gulp.task('build', ['webfonts', 'fonts', 'jsons', 'build:html'], function() {});

let htmls = [
    'src/index.html'
];

let scripts = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/izimodal/js/iziModal.min.js',
    './node_modules/particles.js/particles.js',
    './src/assets/js/util.js',
    './src/assets/js/setup.js',
    './src/assets/js/navigation.js',
    './src/assets/js/main.js',
    './src/assets/js/template.js',
    './src/assets/js/render.js',
    './src/assets/js/listeners.js'
];

let styles = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/@fortawesome/fontawesome-free/css/all.css',
    './node_modules/izimodal/css/iziModal.min.css',
    './src/assets/css/main.css',
    './src/assets/css/custom.css'
];

let fonts = [
    'src/assets/fonts/**/*'
];

let webfonts = [
    './node_modules/@fortawesome/fontawesome-free/webfonts/**/*'
];

let imgs = [
    'src/assets/img/**/*'
];

let jsons = [
    'src/assets/jsons/**/*'
];

gulp.task('clean:fonts', function () {
    return gulp.src('./dist/fonts/**/*')
        .pipe( rm(''));
});

gulp.task('clean:webfonts', function () {
    return gulp.src('./dist/webfonts/**/*')
        .pipe( rm({ async: false }));
});

gulp.task('clean:img', function () {
    return gulp.src('./dist/img/**/*')
        .pipe( rm({ async: false }));
});

gulp.task('clean:jsons', function () {
    return gulp.src('./dist/jsons/**/*')
        .pipe( rm({ async: false }));
});

gulp.task('clean:css', function () {
    return gulp.src('./dist/css/**/*')
        .pipe( rm({ async: false }));
});

gulp.task('clean:html', function () {
    return gulp.src('./dist/index.html')
        .pipe( rm({ async: false }));
});

gulp.task('clean:js', function () {
    return gulp.src('./dist/js/**/*')
        .pipe( rm({ async: false }));
});

gulp.task('fonts', function() {
    gulp.src(fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('webfonts', function() {
    gulp.src(webfonts)
        .pipe(gulp.dest('./dist/webfonts/'));
});

gulp.task('img', function() {
    gulp.src(imgs)
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('jsons', function() {
    gulp.src(jsons)
        .pipe(jsonminify())
        .pipe(gzip())
        .pipe(gulp.dest('./dist/jsons/'));
});

gulp.task('scripts', function() {

    const remplaceRequires = [
        [ 'const {template} = require(\'./template\');', '' ],
        [ 'const {main} = require(\'./main\');', '' ],
        [ 'const {util} = require(\'./util\');', '' ]
    ];

    gulp.src(scripts)
        .pipe(concat('script.js'))
        .pipe(batchReplace(remplaceRequires))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', function() {
    gulp.src(styles)
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
});


gulp.task('html', function() {
    gulp.src(htmls)
        //.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build:fonts', function () {
    if(!fs.existsSync('./rev-manifest.json')) {
        fs.writeFileSync('./rev-manifest.json', '{}');
    }
    return gulp.src(fonts)
        .pipe(rev())
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(rev.manifest({
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('build:img', function () {
    fs.writeFileSync('./rev-manifest.json', '{}');
    return gulp.src(imgs)
        .pipe(rev())
        .pipe(gulp.dest('./dist/img'))
        .pipe(rev.manifest({
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('build:css', ['build:img', 'styles'], function () {

    if(!fs.existsSync('./rev-manifest.json')) {
        fs.writeFileSync('./rev-manifest.json', '{}');
    }

    let replaceAssets = [];

    return gulp.src('./dist/css/style.css')
        .pipe(through.obj(function (chunk, enc, cb) {

            let json_assets = JSON.parse(fs.readFileSync('./rev-manifest.json'));

            for(let original in json_assets) {
                let item = json_assets[original];
                replaceAssets.push([original, item]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(revdel())
        .pipe(rev.manifest({
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./'))

});

gulp.task('build:js', ['build:css', 'scripts'], function () {

    if(!fs.existsSync('./rev-manifest.json')) {
        fs.writeFileSync('./rev-manifest.json', '{}');
    }

    let replaceAssets = [];

    return gulp.src('./dist/js/script.js')
        .pipe(through.obj(function (chunk, enc, cb) {

            let json_assets = JSON.parse(fs.readFileSync('./rev-manifest.json'));

            for(let original in json_assets) {
                let item = json_assets[original];
                replaceAssets.push([original, item]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(revdel())
        .pipe(rev.manifest({
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('build:html', ['build:js'], function () {

    let replaceAssets = [
        ["./css/style.css", "http://assets.javiercaballero.info/css/style.css"],
        ["./js/script.js", "http://assets.javiercaballero.info/js/script.js"]
    ];

    return gulp.src(htmls)

        .pipe(through.obj(function (chunk, enc, cb) {

            let json_assets = JSON.parse(fs.readFileSync('./rev-manifest.json'));

            for(let original in json_assets) {
                let item = json_assets[original];
                replaceAssets.push([original, item]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist/'), {overwrite: true});
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('watch', function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['src/assets/css/**/*'], ['clean:css', 'styles']);
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['src/assets/js/**/*'], ['clean:js', 'scripts']);
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['src/index.html'], ['clean', 'default']);
});