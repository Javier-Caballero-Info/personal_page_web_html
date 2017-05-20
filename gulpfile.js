var gulp = require('gulp');
var through = require('through2')
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var assetsHash = require('gulp-asset-hash');
var batchReplace = require('gulp-batch-replace');
var rm = require( 'gulp-rm' );
var fs = require('fs');

gulp.task('clean', ['clean:fonts','clean:css','clean:js','clean:img'], function() {});

gulp.task('default', ['fonts', 'img', 'styles', 'scripts', 'html'], function() {});

assetsHash.set({
    manifest: './manifest-assets-hash.json',
    length: 13,
    hasher: 'md5'
});

var htmls = [
'src/index.html'
];
/*

*/
var scripts = [
    "./src/js/min/modernizr.js",
    "./src/js/min/jquery-2.1.1.min.js",
    "./src/js/min/owl.carousel.min.js",
    "./src/js/min/waypoints.min.js",
    "./src/js/min/jquery.fittext.min.js",
    "./src/js/min/magnific-popup.min.js",
    "./src/js/min/wow.min.js",
    "./src/js/min/jquery.nicescroll.min.js",
    "./src/js/min/TweenMax.min.js",
    "./src/js/min/ScrollMagic.min.js",
    "./src/js/min/animation.gsap.min.js",
    "./src/js/min/modernizr.custom.11333.min.js",
    "./src/js/min/paper-full.min.js",
    "./src/js/min/typeitout.min.js",
    "./src/js/min/imagesloaded.pkgd.min.js",
    "./src/js/unmin/twitter.js",
    "./src/js/unmin/script.js"
];

var styles = [
    "./src/css/loading.css",
    "./src/css/default.css",
    "./src/css/style.css",
    "./src/css/responsive.css",
    "./src/css/animate.css",
    "./src/css/magnific-popup.css",
    "./src/css/owl.carousel.css",
    "./src/css/owl.theme.css"
];

var fonts = [
'src/fonts/**/*'
];

var imgs = [
    'src/img/**/*'
];

gulp.task('clean:fonts', function () {
	return gulp.src('./dist/fonts/**/*')
	.pipe( rm(''));
});

gulp.task('clean:img', function () {
    return gulp.src('./dist/img/**/*')
        .pipe( rm(''));
});

gulp.task('clean:css', function () {
	return gulp.src('./dist/css/**/*')
	    .pipe( rm(''));
});

gulp.task('clean:js', function () {
	return gulp.src('./dist/js/**/*')
	    .pipe( rm(''));
});

gulp.task('fonts', function() {
	gulp.src(fonts)
	    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('img', function() {
    gulp.src(imgs)
        .pipe(assetsHash.hash())
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('scripts', function() {
	gulp.src(scripts)
        .pipe(concat('script.js'))
        .pipe(assetsHash.hash())
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('styles', function() {

    var replaceAssets = [];

	gulp.src(styles)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(through.obj(function (chunk, enc, cb) {

            var json_assets = JSON.parse(fs.readFileSync('./manifest-assets-hash.json'));

            for(i in json_assets) {

                var item = json_assets[i];

                var original = item.original.split('/')[item.original.split('/').length -1];

                var path = item.path.split('/')[item.path.split('/').length - 1];

                replaceAssets.push([original, path]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(assetsHash.hash())
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('html', function() {

    var replaceAssets = [];

    gulp.src(htmls)
        .pipe(through.obj(function (chunk, enc, cb) {

            var json_assets = JSON.parse(fs.readFileSync('./manifest-assets-hash.json'));

            for(i in json_assets) {

                var item = json_assets[i];

                var original = item.original.split('/')[item.original.split('/').length -1];

                var path = item.path.split('/')[item.path.split('/').length - 1];

                replaceAssets.push([original, path]);
            }

            cb(null, chunk)
        }))
        .pipe(batchReplace(replaceAssets))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});