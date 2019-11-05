require('../index').test( 'video-test', async function ( loopin ) {

  // const filename = `video/vapourdude-mjpeg.mov`
  const filename = `video/vapourdude-h264.mp4`
  // const filename = `video/vapourdude-iframes.mp4`
  const seekTo = 3.2
  const stepTo = 6
  const scratchFrames = 60

  await loopin.testSection( `Load ${filename}`, async () => {
    loopin.patchYAML(`
      video/test:
        file: ${filename}

      show/buffer: test
    `)

    let event = await loopin.dispatchListen( 'video/test/' )
    let result = await loopin.read('/video/test/')
    loopin.log('result', { data: result } )
    await loopin.testDelay(1000)
  } )

  await loopin.testSectionX( `Stop\ntimecode should be around 1:00`, async () => {
    await loopin.patchYAML(`
      video/test/clock/mode: stop
    `)
    await loopin.testDelay()

  } )

  await loopin.testSectionX( `Seek to ${seekTo} seconds`, async () => {    
    await loopin.patchYAML(`
      video/test/clock/time: ${seekTo}
    `)
    await loopin.testDelay(500)
  } )

  await loopin.testSectionX( `Play in frame mode`, async () => {    
    await loopin.patchYAML(`
      video/test/clock/mode: frame
    `)

    await loopin.testDelay(1500)
  } )

  await loopin.testSection( `Creep to end and wait for event`, async () => {    
    await loopin.patchYAML(`
      video/test/clock: 
        time: 9.3
        mode: time
        speed: 0.1
    `)

    await loopin.dispatchListen( 'sync:video/test/' )

    let event = await loopin.dispatchListen( 'video/test/clock' )
    loopin.log('event', { data: event } )

    // await loopin.testDelay(50000)

    // await loopin.patchYAML(`
    //   video/test/clock/mode: frame
    // `)

    // await loopin.testDelay(500)
  } )



  await loopin.testSection( `Seek to ${stepTo} and set step mode`, async () => {    
    await loopin.patchYAML(`
      video/test/clock:
        mode: step
        time: ${stepTo}
    `)
    await loopin.dispatchListen('video/test/')

    await loopin.testDelay(500)

    for ( let i = 0; i < 30; i ++ ) {
      await loopin.testDelay(200)
      await loopin.patch( true, 'video/test/clock/advance')
    }
    await loopin.testDelay(600)

  } )


  await loopin.testSection( `${scratchFrames} frames of random scratching`, async () => {   
    await loopin.patchYAML(`
      video/test/clock:
        mode: stop
    `)

    for ( let i = 0; i < scratchFrames; i ++ ) {
      await loopin.patch( { position: Math.random() }, 'video/test/clock/' )
      // await loopin.testDelay(10)
      await loopin.dispatchListen('video/test/')
    }
  } )

  
})