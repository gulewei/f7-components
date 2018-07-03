import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  output: {
    file: 'dist/components.js',
    format: 'umd',
    name: 'HyperappComponents',
    globals: {
      hyperapp: 'hyperapp'
    }
  },
  input: 'src/index.js',
  external: ['hyperapp'],
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
