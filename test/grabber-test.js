require('../index').test( 'grabber-test', async function ( loopin ) {

  let info = await loopin.read('/info')
  let grabber = info.grabber

  if ( !grabber ) {
    loopin.testLog( `key 'grabber' not found in info.` )
    return 
  }

  let devices = grabber.devices

  if ( !devices ) {
    loopin.testLog( `key 'devices' not found in info.` )
    return 
  }

  loopin.testLog( 'grabber devices from info', devices )

  if ( !devices.length ) {
    loopin.testLog( `No devices available, aborting test.` )
    return 
  }

  let device = devices[ Math.floor( devices.length * Math.random() ) ]

  loopin.patch( device, 'grabber/test' )
  // loopin.patch( 'client', 'syphon/test/mode' )
  loopin.patch( 'test', 'show/buffer')

  await loopin.testDelay( 1000 )

  loopin.patch( {
    width: 5000,
    height: 5000,
  }, 'grabber/test' )

  await loopin.testDelay( 50000 )

})