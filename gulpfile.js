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
var livereload = require('gulp-livereload');
var log = require('gutil-color-log');

gulp.task('clean', ['clean:fonts','clean:css','clean:js','clean:img', 'clean:json'], function() {});

gulp.task('default', ['fonts', 'img', 'styles', 'scripts', 'json', 'html'], function() {});

assetsHash.set({
    manifest: './manifest-assets-hash.json',
    length: 13,
    hasher: 'md5'
});

var htmls = [
'src/index.html'
];

var scripts = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/featherlight/release/featherlight.min.js',
    './src/assets/js/lib/tooltipster.main.min.js',
    './src/assets/js/lib/skel.min.js',
    './src/assets/js/util.js',
    './src/assets/js/main.js'
];

var styles = [
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/featherlight/release/featherlight.min.css',
    './src/assets/css/animate.css',
    './src/assets/css/default.css',
    './src/assets/css/font-awesome.min.css',
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

var jsons = [
    'src/json/**/*.json'
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

gulp.task('clean:js', function () {
	return gulp.src('./dist/assets/js/**/*')
	    .pipe( rm(''));
});

gulp.task('clean:json', function () {
	return gulp.src('./dist/json/**/*')
	    .pipe( rm(''));
});

gulp.task('fonts', function() {
	gulp.src(fonts)
	    .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('img', function() {
    gulp.src(imgs)
        //.pipe(assetsHash.hash())
        .pipe(gulp.dest('./dist/assets/img/'));
});

gulp.task('json', function() {
    gulp.src(jsons)
        //.pipe(assetsHash.hash())
        .pipe(gulp.dest('./dist/json/'));
});

gulp.task('scripts', function() {
	gulp.src(scripts)
        .pipe(concat('script.js'))
       // .pipe(assetsHash.hash())
        .pipe(gulp.dest('./dist/assets/js'));
});


gulp.task('styles', function() {

    var replaceAssets = [];

	gulp.src(styles)
        .pipe(concat('style.css'))
        /*
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
        */
      //  .pipe(batchReplace(replaceAssets))
      //  .pipe(assetsHash.hash())
        .pipe(gulp.dest('./dist/assets/css'));
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
      //  .pipe(batchReplace(replaceAssets))
       // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

// Watch for file updates
gulp.task('watch', function () {

    gulp.watch('src/*.html').on('change', function(file) {
        gulp.run('html');
        log('yellow', 'JS changed' + ' (' + file.path + ')');
    });

    gulp.watch('src/assets/js/*.js').on('change', function(file) {
        gulp.run('scripts');
        log('yellow', 'JS changed' + ' (' + file.path + ')');
    });

    gulp.watch('src/assets/css/*.css').on('change', function(file) {
        gulp.run('styles');
        log('yellow', 'CSS changed' + ' (' + file.path + ')');
    });

});