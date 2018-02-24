'use strict'

var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');

const DIR_OUTOUT='docs';
const DIR_MAP_OUTPUT='./maps';
const DIR_SRC='src';

const CONFIG_TS={
  noImplicitAny: true,
  target: "es5",
  module: "commonjs",
  strict: true,
};

gulp.task('default',['ts2js','scss2css','html']);

gulp.task('ts2js', () =>

  gulp.src(`${DIR_SRC}/**/*.ts`)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ts(CONFIG_TS))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(DIR_OUTOUT))
);

gulp.task('html', ()=> 
  gulp.src(`${DIR_SRC}/*.html`)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(sourcemaps.write(DIR_MAP_OUTPUT))
    .pipe(gulp.dest(DIR_OUTOUT))
);

gulp.task('scss2css', ()=> 
  gulp.src(`${DIR_SRC}/scss/**/*.scss`)
   .pipe(sourcemaps.init())
   .pipe(concat('styles.min.css'))
   .pipe(sourcemaps.write(DIR_MAP_OUTPUT))
   .pipe(gulp.dest(DIR_OUTOUT))
 );