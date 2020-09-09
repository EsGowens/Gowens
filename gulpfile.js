
const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const { watch, parallel } = require('gulp');


function css(cb) {
  
    gulp.src('src/css/*')
    .pipe(sourcemaps.init())
    .pipe(
          postcss([
              require('autoprefixer'),
              require('postcss-preset-env')({
                  stage: 1,
                  browsers: ['IE 11', 'last 2 versions']
              })
          ])
        )
      .pipe(concat('style.css'))
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
      cb();
}

function HTML(cb) {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))

    cb();
}

function images(cb){
    gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))

    cb();
}


function Sync(cb){
    browserSync.init({
        server: {
            baseDir: ('dist')
        }
    })

    cb();
}

exports.default = function () {
    watch('src/css/*', css)
    watch('src/*', parallel(HTML, images, Sync)).on('change', browserSync.reload); 
    

    
};
