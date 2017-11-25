require('../index').test( 'osd-test', async function ( loopin ) {
  await loopin.patchYAML(`
    image/image: image/straight-alpha.png
    show:
      buffer: image
  `)

  await loopin.testPatchAndDisplay( 'multiply', 'show/alpha' )
  await loopin.testPatchAndDisplay( 'divide', 'show/alpha' )
  await loopin.testPatchAndDisplay( 'ignore', 'show/alpha' )
} )
