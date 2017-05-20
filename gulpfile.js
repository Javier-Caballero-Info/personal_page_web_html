var gulp = require('gulp');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var minifyHTML = require('gulp-minify-html');
var rm = require( 'gulp-rm' );

gulp.task('clean', ['clean:fonts','clean:css','clean:js','clean:img'], function() {});

gulp.task('default', ['styles','fonts','scripts','img'], function() {});

var htmls = [
'index.html'
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

var img = [
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
    gulp.src(img)
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('scripts', function() {
	gulp.src(scripts)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('styles', function() {
	gulp.src(styles)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'));
});