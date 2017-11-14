require('../index').test( 'rate', async function ( loopin ) {
  loopin.patchYAML( `
    clock:
      rate: 120
      speed: 0.5
      vsync: true

    render/output:
      src: input
      shader: scroll

    show: output
  ` )

  loopin.testImage( 'input' )
  await testClock( { rate: 120,   mode: 'time',  vsync: false } )
  await testClock( { rate: 60,    mode: 'time',  vsync: true } )
  await testClock( { rate: 10000, mode: 'time',  vsync: true } )
  await testClock( { rate: 10000, mode: 'frame', vsync: true } )



  async function testClock( clock ) {
    clock.fps = "%fps"
    loopin.patch( JSON.stringify( clock ), 'osd/text/' )
    clock.reset = true
    loopin.patch( clock, 'clock/' )
    await loopin.testDelay( 2000 )
  }


} )
