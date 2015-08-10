/*jslint node: true */
"use strict";

var gulp = require('gulp'),
    rename = require('gulp-rename');
var config = require('./config');
var babel = require('gulp-babel');
var concat = require('concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var less = require('gulp-less');
var browserSync = require('browser-sync');
//var supervisor = require('gulp-supervisor');



gulp.task('browser-sync', function(){
  browserSync.init({
    proxy: config.domain+':3000'
  });
});

gulp.task('bs-reload', function(){
  browserSync.reload();
});

gulp.task('babel', function(){
  return gulp.src('app/es6/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('styles' , function(){
  gulp.src(['app/less/app.less'])
    .pipe(less())
    .pipe(gulp.dest('dis/styles'))
    .pipe(minifyCss())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({stream : true}));
});

gulp.task('views' , function(){
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'));
  gulp.src('app/templates/**/*.html')
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('default' , ['browser-sync' , 'styles', 'views' , 'babel'] , function(){
  gulp.watch(['app/less/*.less', 'app/less/**/*.less'], ['styles']);
  gulp.watch(['app/es6/*.js', 'app/es6/**/*.js'] , ['babel']);
  gulp.watch(['app/index.html' , 'app/templates/**/*.html'] , ['views']);
  gulp.watch(['dist/index.html' , 'dist/templates/*.html' , 'dist/templates/**/*.html'] , ['bs-reload']);
});
