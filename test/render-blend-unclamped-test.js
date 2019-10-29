require('../index').test( 'render-blend-unclamped-test', async function ( loopin ) {
  loopin.patchYAML(`
    buffer/test: 
      width: 1
      height: 1
      format: rgba32

    pixels:
      dst:
        format: float
        channels: rgba
        data: 0.5 1 1 -1
      
      src:
        format: float
        channels: rgba
        data: 0.5 1 -1 -1

    render/test:
      layer:
        dst:
          texture/src: dst

    show: test
  `)

  await loopin.testDelay( 1000 )

  await loopin.testAssertBufferColour({
    float: [0.5, 1, 1, -1]
  })

  await loopin.testDelay( 1000 )


  loopin.patchYAML(`
    render/test:
      layer:
        src: 
          texture/src: src
          blend: add

  `)

  await loopin.testAssertBufferColour({
    float: [1, 2, 0, -2]
  })


  loopin.patchYAML(`
    pixels:
      dst/data: 0.5 0 1 1
      src/data: 0.5 1 0 1

    render/test/layer/src/blend: 
      preset: mix
      colour: [0.5,0.5,0.5,0.5] 
  `)

  // await loopin.Promise.delay(2000)
  // console.log( await loopin.read('render/test/layer/src/blend' ) )

  await loopin.testAssertBufferColour({
    float: [0.5, 0.5, 0.5, 1]
  }) 
})
