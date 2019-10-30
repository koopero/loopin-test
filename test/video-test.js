require('../index').test( 'video-test', async function ( loopin ) {

  const filename = `video/vapourdude-mjpeg.mov`


  loopin.patchYAML(`
    video/test:
      file: ${filename}

    show/buffer: test
  `)
 


  let result = await loopin.read('/video')
  console.log( result )

  let event = await loopin.dispatchListen( 'video/test/' )

  console.log( 'event', event )


  await loopin.testDelay( 10000 )
})