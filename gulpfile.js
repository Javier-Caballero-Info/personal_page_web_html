const gulp = require('gulp');
const through = require('through2');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const batchReplace = require('gulp-batch-replace');
const uglify = require('gulp-uglify-es').default;
const rm = require( 'gulp-rm' );
const fs = require('fs');
const s3 = require("gulp-awspublish");
const rename = require('gulp-rename');

const gzip = require('gulp-gzip');

const jsonminify = require('gulp-jsonminify');
const minifyCss = require('gulp-minify-css');

const rev = require('gulp-rev');
const revdel = require('gulp-rev-delete-original');

const aws_headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
};

const aws_publisher = s3.create({
    region: 'us-east-1',
    params: {
        Bucket: 'caballerojavier13-pages-files',
    },
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        signatureVersion: "v3"
    }
});

const tag_manager_body = '<!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NB37W9K" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) -->';

const tag_manager_header = '<!-- Google Tag Manager --> <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\': new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src= \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f); })(window,document,\'script\',\'dataLayer\',\'GTM-NB37W9K\');</script> <!-- End Google Tag Manager -->';


gulp.task('clean', function() {
    gulp.src('./dist/**/*', { read: false })
        .pipe( rm({ async: false }));

    gulp.src('./rev-manifest.json', { read: false })
        .pipe( rm({ async: false }));
});

gulp.task('default', ['fonts', 'webfonts', 'img', 'jsons', 'styles', 'styles_gift', 'scripts', 'scripts_gift', 'html'], function() {});

gulp.task('s3', ['s3:favicon', 's3:jsons'], function() {});

let htmls = [
    'src/index.html',
    'src/gifts/index.html'
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

let scripts_gifts = [
    './node_modules/jquery/dist/jquery.min.js',
    './src/assets/js/jquery.dynatable.js',
    './src/assets/js/util.js',
    './src/assets/js/setup_gift.js',
    './src/assets/js/main_gift.js'
];

let styles = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/@fortawesome/fontawesome-free/css/all.css',
    './node_modules/izimodal/css/iziModal.min.css',
    './src/assets/css/main.css',
    './src/assets/css/custom.css'
];

let styles_gifts = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/@fortawesome/fontawesome-free/css/all.css',
    './src/assets/css/jquery.dynatable.css',
    './src/assets/css/main.css',
    './src/assets/css/custom_gift.css'
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
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts_gift', function() {

    const remplaceRequires = [
        [ 'const {template} = require(\'./template\');', '' ],
        [ 'const {main} = require(\'./main\');', '' ],
        [ 'const {util} = require(\'./util\');', '' ]
    ];

    gulp.src(scripts_gifts)
        .pipe(concat('script_gift.js'))
        .pipe(batchReplace(remplaceRequires))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', function() {
    gulp.src(styles)
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('styles_gift', function() {
    gulp.src(styles_gifts)
        .pipe(concat('style_gift.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('./dist'));
    gulp.src('src/gifts/index.html')
        .pipe(gulp.dest('./dist/gifts'));
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
    return gulp.src('./dist/img/**/*')
        .pipe(rev())
        .pipe(gulp.dest('./dist/img'))
        .pipe(revdel())
        .pipe(rev.manifest({
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('build:css', function () {

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

gulp.task('build:js', function () {

    if(!fs.existsSync('./rev-manifest.json')) {
        fs.writeFileSync('./rev-manifest.json', '{}');
    }

    gulp.src('./dist/js/script.js')
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(revdel())
        .pipe(rev.manifest({
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./'));

    return gulp.src('./dist/js/script_gift.js')
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(revdel())
        .pipe(rev.manifest({
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('build:html', function () {

    let replaceAssets = [
        ['<!--tag_manager_header-->', tag_manager_header],
        ['<!--tag_manager_body-->', tag_manager_body],
        ["./css/style.css", "http://assets.javiercaballero.info/css/style.css"],
        ["./js/script.js", "http://assets.javiercaballero.info/js/script.js"]
    ];

    gulp.src('src/index.html')

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

    return gulp.src('src/gifts/index.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist/'), {overwrite: true});
});

gulp.task('s3:jsons', function(){

    gulp.src("./dist/jsons/**/*")
        .pipe(rename(function (path) {
            path.dirname += '/personal_page/General/';
        }))
        .pipe(aws_publisher.publish(aws_headers))
        .pipe(s3.reporter());

});

gulp.task('s3:favicon', function(){

    gulp.src("./src/favicon.png")
        .pipe(rename(function (path) {
            path.dirname += '/personal_page/General/';
        }))
        .pipe(aws_publisher.publish(aws_headers))
        .pipe(aws_publisher.cache())
        .pipe(s3.reporter());

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