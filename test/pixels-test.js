const assert = require('chai').assert

require('../index').test( 'pixels-test', async function ( loopin ) {

  await testWriteHex()
  await testBase64()
  await testUnclamped()
  await testReadFloat()
  await testWriteFloat()
  await testWriteHex2()

  async function testWriteHex() {
    await loopin.patch( {
      pixels: {
        testWriteHex: {
          format: 'hex',
          channels: 'rgb',
          data: 'ffff00 ff00ff 00ffff'
        }
      },
      show: 'testWriteHex'
    })

    await loopin.testPatchAndDisplay('ffff00 ff00ff 00ffff', 'pixels/testWriteHex/data')

    await loopin.testDelay( 2000 )

    let data = await loopin.read(`buffer/testWriteHex`)
    assert.equal( data.width, 3 )
    assert.equal( data.height, 1 )
  }

  function testWriteHex2() {
    const bufferName = 'testWriteHex2'
    return loopin.Promise.resolve(
      loopin.patch( {
        pixels: {
          testWriteHex2: {
            format: 'hex2',
            channels: 'rgb',
            width: 2,
            data: 'f00 0f0 00f fff'
          }
        },
        show: 'testWriteHex2'
      })
    )
    .then( () => loopin.testPatchAndDisplay( 'f00 0f0 00f fff', 'pixels/testWriteHex2/data' ) )
    .then( () => loopin.read(`buffer/testWriteHex2`) )
    .then( ( data ) => {
      assert.equal( data.height, 2 )
    })
  }

  function testWriteFloat() {
    const bufferName = 'testWriteFloat'
    return loopin.Promise.resolve(
      loopin.patch( {
        pixels: {
          testWriteFloat: {
            format: 'float',
            channels: 'r',
            width: 3,
          }
        },
        show: 'testWriteFloat'
      })
    )
    .then( () => loopin.testPatchAndDisplay( '0 1 0 1 0.5 1 0 1 0', 'pixels/testWriteFloat/data' ) )
    .then( () => loopin.read(`buffer/testWriteFloat`) )
    .then( ( data ) => {
      assert.equal( data.height, 3 )
    })
  }

  function testReadFloat() {
    return loopin.Promise.resolve(
      loopin.patch( {
        pixels: {
          _0_write: {
            buffer: 'testReadFloat',
            format: 'hex2',
            channels: 'rgb',
            width: 2,
            data: 'f00 0f0 00f fff'
          },

          _1_read: {
            buffer: 'testReadFloat',
            format: 'float',
            channels: 'rgba'
          }
        },
        show: 'testReadFloat'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.patch('once','pixels/_1_read/output') )
    .then( () => loopin.dispatchListen('pixels') )
    .then( ( event ) => {
      let data = event.data.data
      data = data.split(/[^\d\.\-e]+/)
      data = data.map( ( v ) => parseFloat(v) )
      assert.deepEqual( data, [
        1,0,0,1,  0,1,0,1,
        0,0,1,1,  1,1,1,1
      ])
    })
    .then( () => loopin.testDelay() )
  }

  function testUnclamped() {
    return loopin.Promise.resolve()
    .then( () =>
      loopin.patch( {
        buffer: {
          testUnclamped: {
            format: 'rgb32'
          }
        },
        pixels: {
          _2_write: {
            buffer: 'testUnclamped',
            format: 'percent',
            channels: 'rgb',
            data: '-100 50 200'
          },

          _3_read: {
            buffer: 'testUnclamped',
            format: 'float',
            channels: 'rgba'
          }
        },
        show: 'testUnclamped'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.patch('once','pixels/_3_read/output') )
    .then( () => loopin.dispatchListen('pixels') )
    .then( ( event ) => {
      let data = event.data.data
      data = data.split(/[^\d\.\-e]+/)
      data = data.map( ( v ) => parseFloat(v) )
      assert.deepEqual( data, [ -1, 0.5, 2, 1 ] )
    })
    .then( () => loopin.testDelay() )
  }


  function testBase64() {
    let pixels = [ 200, 0, 0, 255, 0, 0, 200, 255 ]
      , buff = new Buffer( pixels )
      , base64 = buff.toString('base64')

    return loopin.Promise.resolve()
    .then( () =>
      loopin.patch( {
        pixels: {
          _4_write: {
            buffer: 'testBase64',
            format: 'base64',
            channels: 'rgba'
          },

          _5_read: {
            buffer: 'testBase64',
            format: 'base64',
            channels: 'rgba'
          }
        },
        show: 'testBase64'
      })
    )
    .then( () => loopin.testPatchAndDisplay( base64, 'pixels/_4_write/data') )
    .then( () => loopin.read('buffer/testBase64') )
    .tap( console.log )
    .then( ( data ) => {
      assert.equal( data.width, 2 )
      assert.equal( data.height, 1 )
    } )
    .then( () => loopin.patch('once','pixels/_5_read/output') )
    .then( () => loopin.dispatchListen('pixels') )
    .then( ( event ) => {
      let data = event.data.data
      assert.deepEqual( data, base64 )
    })
    .then( () => loopin.testDelay() )
  }
})
