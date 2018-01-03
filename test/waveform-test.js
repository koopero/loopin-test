require('../index').test( 'waveform-test', async function ( loopin ) {


  // TODO: Can't read info/waveform directly...
  let info = await loopin.read('info')
  info = info['waveform']

  loopin.log( 'waveform-test', 'info', info )

  let deviceID = process.env.LOOPIN_TEST_WAVEFORM_DEVICEID || 0

  loopin.patch({
    waveform: {
      test: {
        deviceID: deviceID,
        duration: 2,
        squelch: 0.0,
        gain: 10,
        phase: 'abs'
      }
    },
    show: {
      buffer: 'test',
      filter: 'nearest'
    }
  })

  await loopin.testDelay( 5000 )
})
