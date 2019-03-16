require('../index').test( 'render-blend-test', async function ( loopin ) {
  loopin.patchYAML(`
    buffer/test: 
      width: 1
      height: 1

    pixels:
      dst:
        format: hex
        data: 'ff0000'
      
      src:
        format: hex
        data: '00ff00'

    render/test:
      layer:
        dst:
          src: dst
        
        src: 
          src: src
          blend: add

    show: test
  `)

  // await loopin.testAssertBufferColour({
  //   hex: 'ffff00'
  // })


  loopin.patchYAML(`
    pixels:
      dst/data: 'ff2000'
      src/data: '20ff00'

    render/test/src/blend: min
  `)

  await loopin.testAssertBufferColour({
    hex: '202000'
  })
})
