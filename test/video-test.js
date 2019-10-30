require('../index').test( 'video-test', async function ( loopin ) {

  // const filename = `video/vapourdude-h264.mp4`
  const filename = `video/vapourdude-mjpeg.mov`


  loopin.patchYAML(`
    video/test:
      file: ${filename}

    show/buffer: test
  `)
 


  let event = await loopin.dispatchListen( 'video/test/' )
  let result = await loopin.read('/video/test/')

  loopin.log('result', { data: result } )

  await loopin.testDelay(1000)

  await loopin.patchYAML(`
    video/test/clock/mode: stop
  `)

  await loopin.testDelay()
  loopin.log('clock', { data: await loopin.read('/video/test/clock') } )

  await loopin.patchYAML(`
    video/test/clock/time: 3
  `)
  await loopin.testDelay(500)

  await loopin.patchYAML(`
    video/test/clock/mode: frame
  `)

  await loopin.testDelay(500)

  await loopin.patchYAML(`
    video/test/clock:
      mode: step
      time: 5
  `)

  await loopin.dispatchListen('video/test/')
  loopin.log('clock', { data: await loopin.read('/video/test/clock') } )

  // await loopin.testDelay(500)

  for ( let i = 0; i < 4; i ++ ) {
    await loopin.testDelay(500)
    await loopin.patch( true, 'video/test/clock/advance')
  }

  await loopin.patchYAML(`
    video/test/clock:
      mode: stop
  `)

  for ( let i = 0; i < 600; i ++ ) {
    await loopin.patch( { position: Math.random() }, 'video/test/clock/' )
    // await loopin.testDelay(10)
    await loopin.dispatchListen('video/test/')
  }

  
})