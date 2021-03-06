var gulp = require('gulp');
var postcss = require('gulp-postcss');
var precss = require('precss');
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var short = require('postcss-short');

var browserSync = require('browser-sync').create();

var iconfontCss = require('gulp-iconfont-css');
var iconfont = require('gulp-iconfont');

gulp.task('css', function() {
    var processors = [
        precss,
        short,
        autoprefixer({ browsers: ['last 2 version'] })
    ];
    return gulp.src('./build/scss/*.scss')
        .pipe(postcss(processors))
        .pipe(rename({
            extname: ".css"
        }))
        .pipe(gulp.dest('./dest/css/'))
        .pipe(browserSync.stream());
})


// Static Server + watching scss/html files
gulp.task('default', ['css'], function() {

    browserSync.init({
        proxy: 'http://localhost:8888'
    });

    gulp.watch('./build/scss/*.scss', ['css']);
    gulp.watch('./dest/**/*.php').on('change', browserSync.reload);
});


// svg to font and generate scss
var fontName = 'icons';

gulp.task('iconfont', function() {
    gulp.src(['build/svg/*.svg'], { base: './' })
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'build/templates/icons.css',
            targetPath: '../../build/scss/icons.scss',
            fontPath: '../fonts/',
        }))
        .pipe(iconfont({
            fontName: fontName,
            normalize: true
        }))
        .pipe(gulp.dest('dest/fonts'));
});

gulp.task('min', function() {
    var processors = [
        cssnano(),
    ];
    return gulp.src('./build/scss/site.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest/css/'));
});
