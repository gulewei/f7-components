const gulp = require('gulp')
const less = require('gulp-less')

const src = {
  css: 'components/**/*.less',
  less: 'components/**/*.less',
  typing: ['components/**/*.d.ts']
}

const dest = {
  lib: 'lib',
  es: 'es'
}

const makeTask = (_dest) => {
  const buildCss = () => {
    return gulp.src(src.css)
      .pipe(less())
      .pipe(gulp.dest(_dest))
  }

  const copyLess = () => {
    return gulp.src(src.less)
      .pipe(gulp.dest(_dest))
  }

  const copyTyping = () => {
    return gulp.src(src.typing)
      .pipe(gulp.dest(_dest))
  }

  return gulp.parallel(buildCss, copyLess, copyTyping)
}

// es
gulp.task('es', makeTask(dest.es))

// lib
gulp.task('lib', makeTask(dest.lib))
