import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  output: {
    file: 'dist/f7-components.js',
    format: 'umd',
    name: 'F7Components',
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
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          'es2015',
          {
            'modules': false
          }
        ]
      ],
      plugins: [
        [
          'transform-react-jsx',
          {
            'pragma': 'h'
          }
        ],
        'transform-object-rest-spread',
        'external-helpers'
      ]
    })
  ]
}
