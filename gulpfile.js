'use strict';
 
var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss  = require('gulp-minify-css'),
    rename     = require('gulp-rename');
	
	
gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
		  browsers:  ['Safari 8'],
		  cascade: false
		}))
		.pipe(gulp.dest('./css'))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(rename("style.min.css"))
		.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});
gulp.task('sass:watch', function () {
    gulp.watch(['./sass/**/*.scss'], ['sass']);
});

gulp.task('watch', ['sass:watch']);