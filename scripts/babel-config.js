const fs = require('fs')

const rc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'))

function modulePreset (preset, modules) {
  return modules ? preset.concat({ modules: false }) : preset
}

exports.rollup = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [modulePreset(rc.presets[0], true)].concat(rc.presets.slice(1)),
  plugins: rc.plugins.concat('external-helpers')
}
exports.lib = {
  babelrc: false,
  presets: [modulePreset(rc.presets[0], false)].concat(rc.presets.slice(1)),
  plugins: rc.plugins.concat('transform-runtime')
}
exports.es = {
  babelrc: false,
  presets: [modulePreset(rc.presets[0], true)].concat(rc.presets.slice(1)),
  plugins: rc.plugins.concat('transform-runtime')
}
