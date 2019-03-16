module.exports = testAssertBufferColour

const assert = require('../assert')

async function testAssertBufferColour( {
  hex = '00ff00',
  buffer = 'test',
} ) {
  const loopin = this
  const { Promise } = loopin

  await Promise.delay(1000)

  loopin.patchYAML(`
    pixels/test:
      buffer: ${buffer}
      format: hex
      channels: rgba
      output: once
  `)

  let event = await loopin.dispatchListen('pixels')
  let data = event.data.data

  if ( hex ) {
    let dataCropped = data.substr( 0, hex.length )
    assert.equal( dataCropped, hex )
  }
  // process.exit()
}
