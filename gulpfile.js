// Based off the Fastshell boilerplate

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    pug          = require('gulp-pug'),
    data         = require('gulp-data'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    cssnano      = require('gulp-cssnano'),
    sourcemaps   = require('gulp-sourcemaps'),
    fs           = require('fs'),
    package      = require('./package.json');

gulp.task('css', function () {
    return gulp.src('src/sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function () {
    var dataFile = 'src/pages/projects.json';

    return gulp.src('src/index.pug')
    .pipe(data(function(file){
        return JSON.parse(fs.readFileSync(dataFile));
    }))
    .pipe(sourcemaps.init())
    .pipe(pug({
        pretty: true // @todo: remove in prod
    }))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/smoothscroll.js')
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/sass/**/*.sass", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("src/**/*.pug", ['html']);
    gulp.watch("src/pages/projects.json", ['html']);
});
