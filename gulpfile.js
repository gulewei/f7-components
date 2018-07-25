const gulp = require('gulp')
const less = require('gulp-less')
const babel = require('gulp-babel')
// const path = require('path')

gulp.task('style:css', () => {
  return gulp.src('components/**/style/index.less')
    .pipe(less())
    .pipe(gulp.dest('lib'))
})

gulp.task('style:less', () => {
  return gulp.src([
    'components/**/*.less'
  ])
    .pipe(gulp.dest('lib'))
})

gulp.task('style', ['style:css', 'style:less'])

gulp.task('js:babel', () => {
  return gulp.src('components/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('js:typing', () => {
  return gulp.src('components/**/*.d.ts')
    .pipe(gulp.dest('lib'))
})

gulp.task('js', ['js:babel', 'js:typing'])
