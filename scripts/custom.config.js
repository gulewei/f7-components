const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const config = require('./babel-config').rollup

module.exports = {
  output: {
    file: 'dist/f7c.custom.js',
    format: 'umd',
    name: 'f7c'
  },
  input: 'scripts/custom.js',
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    resolve(),
    babel(config)
  ]
}
