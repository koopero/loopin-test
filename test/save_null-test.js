const assert = require('../src/assert')

require('../src/wrapper')( 'save_null', 'save will throw on unallocated buffer', function ( loopin ) {

  loopin.plugin('save')
  loopin.plugin('log')
  loopin.logShow('patch')

  const threw = {}

  return loopin.save('no_buffer')
  .catch( function ( e ) {
    return threw
  })
  .then( ( result ) => {
    assert.equal( result, threw )
  } )
  // Try again, but with the buffer allocated, but not rendered
  .then( function () {
    loopin.patch( { width: 320, height: 240 }, 'buffer/bad_buffer' )
    loopin.patch( 'bad_buffer', 'show/buffer' )
  } )
  .then( () => loopin.testDelay(1000) )
  .then( () => loopin.save('bad_buffer', 'tmp/foo.png') )
  .then( () => loopin.testDelay() )



}, { waitForBootstrap: false } )
