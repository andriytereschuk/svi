var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var short = require('postcss-short');

var browserSync = require('browser-sync').create();

var iconfontCss = require('gulp-iconfont-css');
var iconfont = require('gulp-iconfont');

gulp.task('css', function () {
    var processors = [
        cssnext,
        short,
        // cssnano(),
    ];
    return gulp.src('./build/cssnext/*.css')
        .pipe(postcss(processors))
        .on('error', () => {})
        .pipe(gulp.dest('./dest/css/'));
})


// Static Server + watching scss/html files
gulp.task('default', ['css'], function () {

    browserSync.init({
        proxy: 'http://localhost/svi'
    });

    gulp.watch('./build/cssnext/*.css', ['css']);
    gulp.watch('./dest/**/*.php').on('change', browserSync.reload);
});


// svg to font and generate scss
var fontName = 'icons';

gulp.task('iconfont', function () {
    gulp.src(['build/icons/*.svg'], { base: './' })
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'templates/_icons.css',
            targetPath: '../scss/_icons.scss',
            fontPath: '../fonts/',
        }))
        .pipe(iconfont({
            fontName: fontName,
            normalize: true
        }))
        .pipe(gulp.dest('fonts'));
});