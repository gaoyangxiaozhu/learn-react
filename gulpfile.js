var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var webpack = require("gulp-webpack");
var webpackConfig = require('./webpack.publish');
var webpackComponentsConfig = require('./webpack.components.publish');
var path = require('path');


/** jade to html **/
gulp.task('jade', function(){
    return gulp.src(['./jade/*.jade', './jade/**/*.jade'])
    .pipe(plumber())
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./public/'));
})

gulp.task("webpack", function() {
  return gulp.src('./')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./public/build'));
});

gulp.task("components", function() {
  return gulp.src('./')
  .pipe(webpack(webpackComponentsConfig))
  .pipe(gulp.dest('./public/build/components'));
});

gulp.task('build', ['webpack', 'components']);

gulp.task('default', ['nodemon']);

function browserSyncInit (baseDir) {
    //起动browserSync
    browserSync.init({
	      proxy : 'localhost:8000'
    });
}
gulp.task('nodemon', ['jade', 'build', 'watch'], function(){
    nodemon({
        script : "app.js",
        ext : "js html",
        env : {
            "NODE_ENV":"development"
        }
    }).on('start', function(){
        if(browserSync.active){
            browserSync.reload();
        }else{
            browserSyncInit();
        }
    });
})
gulp.task('watch', function() {
    gulp.watch(['./jade/**/*.jade', './**/*.jsx', './**/*.scss', '!./public/build/*.js'], ['jade', 'webpack']);
});
