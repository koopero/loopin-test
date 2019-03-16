require('../index').test( 'syphon-test', async function ( loopin ) {

  let info = await loopin.read('/info')
  let syphon = info.syphon

  if ( !syphon ) {
    loopin.testLog( `key 'syphon' not found in info. Probably not on OSX.` )
    return 
  }

  let servers = syphon.servers

  if ( !syphon ) {
    loopin.testLog( `key 'syphon' not found in info. Probably not on OSX.` )
    return 
  }


  loopin.testLog( 'syphon servers from info', servers )
  console.log('servers', servers )


  let server = servers[0]

  loopin.patch( server, 'syphon/test' )
  loopin.patch( 'client', 'syphon/test/mode' )
  loopin.patch( 'test', 'show/buffer')

  await loopin.testDelay( 50000 )
})