// import commonjs from 'rollup-plugin-commonjs'
// import resolve from 'rollup-plugin-node-resolve'
// import babel from 'rollup-plugin-babel'
// import { rollup } from './scripts/babel-config'
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const config = require('./scripts/babel-config').rollup

console.log(JSON.stringify(config))

module.exports = {
  output: {
    file: 'dist/f7-components.js',
    format: 'umd',
    name: 'F7Components',
    globals: {
      hyperapp: 'hyperapp'
    }
  },
  input: 'components/index.js',
  external: ['hyperapp'],
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    resolve(),
    babel(config)
  ]
}
