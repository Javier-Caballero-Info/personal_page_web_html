let gulp = require('gulp');
let through = require('through2');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let clean = require('gulp-clean');
let htmlmin = require('gulp-htmlmin');
let batchReplace = require('gulp-batch-replace');
let rm = require( 'gulp-rm' );
let fs = require('fs');

let minifyCss = require('gulp-minify-css');

let rev = require('gulp-rev');
let revdel = require('gulp-rev-delete-original');


gulp.task('clean', ['clean:fonts','clean:webfonts','clean:css','clean:js','clean:img', 'clean:html'], function() {});

gulp.task('default', ['fonts', 'webfonts', 'img', 'styles', 'scripts', 'html'], function() {});

gulp.task('build', ['default', 'build:css'], function() {});

let htmls = [
  'src/index.html'
];

let scripts = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/izimodal/js/iziModal.min.js',
    './node_modules/particlesjs/dist/particles.min.js',
    './src/assets/js/util.js',
    './src/assets/js/setup.js',
    './src/assets/js/main.js'
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

gulp.task('clean:fonts', function () {
	return gulp.src('./dist/assets/fonts/**/*')
	.pipe( rm(''));
});

gulp.task('clean:webfonts', function () {
	return gulp.src('./dist/assets/webfonts/**/*')
	.pipe( rm(''));
});

gulp.task('clean:img', function () {
    return gulp.src('./dist/assets/img/**/*')
        .pipe( rm(''));
});

gulp.task('clean:css', function () {
	return gulp.src('./dist/assets/css/**/*')
	    .pipe( rm(''));
});

gulp.task('clean:html', function () {
	return gulp.src('./dist/index.html')
	    .pipe( rm(''));
});

gulp.task('clean:js', function () {
	return gulp.src('./dist/assets/js/**/*')
	    .pipe( rm(''));
});

gulp.task('fonts', function() {
	gulp.src(fonts)
	    .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('webfonts', function() {
	gulp.src(webfonts)
	    .pipe(gulp.dest('./dist/assets/webfonts/'));
});

gulp.task('img', function() {
    gulp.src(imgs)
        .pipe(gulp.dest('./dist/assets/img/'));
});

gulp.task('scripts', function() {
	gulp.src(scripts)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('styles', function() {
	gulp.src(styles)
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/assets/css'))
});


gulp.task('html', function() {
    gulp.src(htmls)
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build:fonts', function () {
    return gulp.src('./dist/assets/fonts/**/*')
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest('./dist/assets/fonts'))
        .pipe(rev.manifest({
            base: './target/manifest',
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./target/manifest'))
});

gulp.task('build:img', function () {
    return gulp.src('./dist/assets/img/**/*')
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(rev.manifest({
            base: './target/manifest',
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./target/manifest'))
});

gulp.task('build:css', function () {

    let replaceAssets = [];

    return gulp.src('./dist/assets/css/style.css')
        .pipe(rev())
        .pipe(revdel())
        .pipe(through.obj(function (chunk, enc, cb) {

            let json_assets = JSON.parse(fs.readFileSync('./rev-manifest.json'));

            for(let original in json_assets) {
                let item = json_assets[original];
                replaceAssets.push([original, item]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(rev.manifest({
            base: './target/manifest',
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./target/manifest'));

});

gulp.task('build:js', function () {
    return gulp.src('./dist/assets/js/script.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(revdel())
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(rev.manifest({
            base: './target/manifest',
            merge: true // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./target/manifest'))
});

gulp.task('build:html', function () {

    let replaceAssets = [];

    return gulp.src('./dist/index.html')
        .pipe(through.obj(function (chunk, enc, cb) {

            let json_assets = JSON.parse(fs.readFileSync('./rev-manifest.json'));

            for(let original in json_assets) {
                let item = json_assets[original];
                replaceAssets.push([original, item]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(gulp.dest('./dist/'), {overwrite: true});
});