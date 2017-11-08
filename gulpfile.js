const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const gutil = require('gulp-util');

gulp.task('styles', function(){
  return gulp
        .src('./source/sass/main.scss')
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());

});

gulp.task('pages', function(){
  return gulp
        .src('./source/index.pug')
        .on('error', gutil.log)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());

});

gulp.task('copy', function(){
    return gulp
            .src('./source/img/*', {base: './source/img/'})
            .pipe(watch('./source/img/', {base: './source/img/'}))
            .pipe(gulp.dest('./public/img'));


});

gulp.task('copy_js', function(){
    return gulp
            .src('./source/js/*', {base: './source/js/'})
            .pipe(watch('./source/js/*.js', {base: './source/js/'}))
            .pipe(gulp.dest('./public/js'));


});

gulp.task('serve', ['styles', 'pages'], function() {

    browserSync.init({
         server: {
            baseDir: "./public"
        }
    });

    gulp.watch('./source/**/*.scss', ['styles'])
    gulp.watch('./source/**/*.pug', ['pages'])
    gulp.watch('./public/index.html').on('change', browserSync.reload)
});



gulp.task('default', ['pages', 'styles', 'copy' , 'copy_js' , 'serve']);