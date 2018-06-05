export default {
  output: {
    file: 'dist/components.js',
    format: 'umd'
  },
  input: 'src/index.js',
  external: ['hyperapp', 'classnames']
}
