var gulp = require('gulp');
var path = require('path');
var through = require('through2');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var batchReplace = require('gulp-batch-replace');
var rm = require( 'gulp-rm' );
var fs = require('fs');
var log = require('gutil-color-log');

var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

const rev = require('gulp-rev');
var revdel = require('gulp-rev-delete-original');


gulp.task('clean', ['clean:fonts','clean:css','clean:js','clean:img', 'clean:html'], function() {});

gulp.task('default', ['fonts', 'img', 'styles', 'scripts', 'html'], function() {});

gulp.task('build', ['default', 'build:css'], function() {});

var htmls = [
'src/index.html'
];

var scripts = [
    './node_modules/jquery/dist/jquery.min.js',
    './src/assets/js/lib/skel.min.js',
    './node_modules/izimodal/js/iziModal.min.js',
    './src/assets/js/lib/particles.min.js',
    './src/assets/js/util.js',
    './src/assets/js/main.js'
];

var styles = [
    //'./node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/izimodal/css/iziModal.min.css',
    './src/assets/css/icomoon.css',
    './src/assets/css/default.css',
    './src/assets/css/ie9.css',
    './src/assets/css/loading.css',
    './src/assets/css/main.css',
    './src/assets/css/noscript.css'
];

var fonts = [
    'src/assets/fonts/**/*'
];

var imgs = [
    'src/assets/img/**/*'
];

gulp.task('clean:fonts', function () {
	return gulp.src('./dist/assets/fonts/**/*')
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

    var replaceAssets = [];

    return gulp.src('./dist/assets/css/style.css')
        .pipe(rev())
        .pipe(revdel())
        .pipe(through.obj(function (chunk, enc, cb) {

            var json_assets = JSON.parse(fs.readFileSync('./rev-manifest.json'));

            for(var original in json_assets) {
                var item = json_assets[original];
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

    var replaceAssets = [];

    return gulp.src('./dist/index.html')
        .pipe(through.obj(function (chunk, enc, cb) {

            var json_assets = JSON.parse(fs.readFileSync('./rev-manifest.json'));

            for(var original in json_assets) {
                var item = json_assets[original];
                replaceAssets.push([original, item]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(gulp.dest('./dist/'), {overwrite: true});
});