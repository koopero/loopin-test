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
          src: dst
        
        src: 
          src: src
          blend: add

    show: test
  `)

  await loopin.testAssertBufferColour({
    float: [1, 2, 0, -2]
  })
})
