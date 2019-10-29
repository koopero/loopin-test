require('../index').test( 'video-test', async function ( loopin ) {

  // const filename = `video/1920x1080-30fps-10sec-hap.mov`
  // const filename = `video/1920x1080-30fps-10sec-hap.mov`
  const filename = `video/8MP-30fps-10sec-h264-crf22.mov`


  loopin.patchYAML(`
    video/test:
      src: ${filename}

    show/buffer: test
  `)
 


  let result = await loopin.read('/video')
  console.log( result )

  let event = await loopin.dispatchListen( 'video/test/' )

  console.log( 'event', event )


  await loopin.testDelay( 10000 )
})