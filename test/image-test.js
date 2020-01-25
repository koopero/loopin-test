require('../index').test( 'image-test', async function ( loopin ) {

  // loopin.patchYAML( `
  //   buffer/test:
  //     width: 1000
  //     height: 1000
  //
  //   image/test:
  //     src: image/indian.png
  //     box:
  //       x: 500
  //       y: 500
  //       width: 500
  //       height: 500
  //
  //
  //
  //   show: test
  // `)
  //
  // let result = await loopin.dispatchListen('done')
  //
  // console.log( result )
  // await loopin.testDelay()

  loopin.plugin('image')
  loopin.patch('out', 'show/')





  return loopin.image('loader', { buffer: 'out', src: 'image/indian.png', crop: { width: 300 } } )
    .then(( data ) => {
      loopin.patch( "Loaded", 'osd/server' )
    })
    .then(() => loopin.testDelay() )
})
