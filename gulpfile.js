const gulp = require('gulp')
const less = require('gulp-less')
const babel = require('gulp-babel')
const through2 = require('through2')

const src = {
  css: [
    'components/**/*.less'
  ],
  less: 'components/**/*.less',
  js: 'components/**/*.js',
  typing: ['components/**/*.d.ts']
}
const dest = {
  lib: 'lib',
  es: 'es'
}

let modules = false
gulp.task('module:true', () => {
  modules = true
})
gulp.task('module:false', () => {
  modules = false
})

const getDest = () => modules ? dest.es : dest.lib

// styles
gulp.task('style:css', () => {
  return gulp.src(src.css)
    .pipe(less())
    .pipe(gulp.dest(getDest()))
})
gulp.task('style:less', () => {
  return gulp.src(src.less)
    .pipe(gulp.dest(getDest()))
})
gulp.task('style', ['style:css', 'style:less'])

// js
gulp.task('js:babel', () => {
  const config = {
    babelrc: false,
    presets: [
      modules ? ['es2015', { 'modules': false }] : 'es2015'
    ],
    plugins: [
      [
        'transform-react-jsx',
        {
          'pragma': 'h'
        }
      ],
      'transform-object-rest-spread',
      'transform-runtime'
    ]
  }
  return gulp.src(src.js)
    .pipe(babel(config))
    .pipe(through2.obj(function (file, encoding, next) {
      this.push(file.clone())
      // console.log('before precess: ', file.path)
      if (file.path.match(/\\_?style\\index\.js/)) {
        const content = file.contents.toString(encoding)
        file.contents = Buffer.from(content
          .replace(/\/_style\/?'/g, '/_style/css\'')
          .replace(/\.less/g, '.css'))
        file.path = file.path.replace(/index\.js/, 'css.js')
        this.push(file)
        // console.log('css.js is pushed ')
        next()
      } else {
        next()
      }
    }))
    .pipe(gulp.dest(getDest()))
})
gulp.task('js:typing', () => {
  return gulp.src(src.typing)
    .pipe(gulp.dest(getDest()))
})
gulp.task('js', ['js:babel', 'js:typing'])

// build lib
gulp.task('lib', ['module:false', 'style:css', 'style:less', 'js:babel', 'js:typing'])
// build es
gulp.task('es', ['module:true', 'style:css', 'style:less', 'js:babel', 'js:typing'])
