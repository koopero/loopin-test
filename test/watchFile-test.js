const assert = require('../src/assert')
const fs = require('fs-extra')
const YAML = require('js-yaml')
  
require('../index').test( 'watchFile', async function ( loopin ) {
  const { Promise } = loopin
  loopin.plugin('watchFile')

  const file = 'tmp/watchFile-test.yaml'
  var watcher
  var promise

  watcher = loopin.watchFile(file)
  assert.isObject( watcher )
  assert.isFunction( watcher.on )

  let preset

  await fs.unlink( file )

  // promise = new Promise( async ( resolve ) => {
  //   watcher.on('change', resolve )
  //   await writePreset()
  // } )
  // await promise.timeout( 1000 )
  // await loopin.testDelay()

  // promise = new Promise( async ( resolve ) => {
  //   watcher.on('load', function( result ) {
  //     assert.equal( result.type, 'preset')
  //     resolve()
  //   } )
  //   await writePreset()
  // } )
  // await promise.timeout( 1000 )
  // await loopin.testDelay()
  await loopin.testDelay(10000)

  promise = new Promise( async ( resolve ) => {
    loopin.on('patch', function( result ) {
      assert.deepEqual( result.value, preset )
      resolve()
    } )
    await writePreset()
  } )
  await promise.timeout( 10000 )
  await loopin.testDelay()



  async function writePreset() {
    preset = { uniform: { float: { foo: Math.random() } } }
    await fs.outputFile( loopin.filesResolve(file), YAML.dump( preset ) )
  }
} )
