var json = require ('rollup-plugin-json')
var buble = require ('rollup-plugin-buble')
var multiEntry = require ('rollup-plugin-multi-entry')

export default {
  format: 'umd',
  moduleName: 'webrtc',

  plugins: [
    json(),
    buble({
      transforms: { generator: true, modules: true }
    }),
    multiEntry ()
  ],
  entry: {
    include: [
//    '{.,**}/script.{es,js}'
      '{.,media}/script.es'
//    './media/audio-spec.es'
    ],
    exclude: ['{node_modules,vendor}/**/script.{es,js}']
  },
  dest: './public/script.js',
  globals: { tape: require ('tape') }
}
