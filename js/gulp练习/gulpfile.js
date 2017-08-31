var gulp = require('gulp')
var uglify = require('gulp-uglify') //js压缩
var concat = require('gulp-concat') // 文件连接
var cssnano = require('gulp-cssnano') // css压缩
var imagemin = require('gulp-imagemin') // img压缩

gulp.task('js', function() {
  gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('css', function() {
  gulp.src('./css/*.css')
    .pipe(concat('all.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('img', function() {
  gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/imgs'))
})