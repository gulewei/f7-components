const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const config = require('./babel-config').rollup

const inputOptions = {
  input: 'scripts/custom.js',
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    resolve(),
    babel(config)
  ]
}
const outputOptions = {
  format: 'umd',
  file: 'dist/f7c.custom.js',
  name: 'f7c'
}

exports.custom = () => {
  return rollup.rollup(inputOptions).then(bundle => {
    return bundle.write(outputOptions)
  })
}
