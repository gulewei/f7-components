const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')


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
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ]
}
