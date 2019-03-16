module.exports = testAssertBufferColour

const assert = require('../assert')
const _ = require('lodash')

async function testAssertBufferColour( {
  hex = '',
  float = null,
  buffer = 'test',
} ) {
  const loopin = this
  const { Promise } = loopin

  await Promise.delay(1000)

  async function getPixels( encoding ) {
    loopin.patchYAML(`
      pixels/testAssertBufferColour:
        buffer: ${buffer}
        format: ${encoding}
        channels: rgba
        output: once
    `)

    let event = await loopin.dispatchListen('pixels')
    return event.data.data
  }

  if ( hex ) {
    let data = await getPixels('hex')
    let dataCropped = data.substr( 0, hex.length )
    assert.equal( dataCropped, hex )
  }

  if ( float ) {
    if ( _.isString( float ) )
      float = float.split(/[\s,]+/g).map( v => parseFloat( v ) )

    let data = await getPixels('float')
    data = data.split(/[\s,]+/g).map( v => parseFloat( v ) )
    let dataCropped = data.slice( 0, float.length )
    assert.deepEqual( dataCropped, float )
  }
  // process.exit()
}
