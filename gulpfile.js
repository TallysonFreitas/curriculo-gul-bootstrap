const gulp = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const obfuscate = require('gulp-obfuscate')
const imageMin = require('gulp-imagemin')

function compilaSass(){
    return gulp.src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/styles'))
}

function minimizarImg() {  
    return gulp.src('./src/img/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./dist/img'))
}

function comprimeJs() {  
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./dist/scripts'))
}

function htmlmin(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
}

exports.default = function () {  
    gulp.watch('./src/styles/main.scss',{ignoreInitial:false}, gulp.series(compilaSass))
    gulp.watch('./src/scripts/main.js',{ignoreInitial:false}, gulp.series(comprimeJs))
    gulp.watch('./src/index.html',{ignoreInitial:false},gulp.series(htmlmin))
    gulp.watch('./src/img/*',{ignoreInitial:false},gulp.series(minimizarImg))
}