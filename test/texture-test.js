require('../index').test( 'texture-test', function ( loopin ) {

  loopin.patchYAML(`
    window/width/: 1024
    window/height/: 1024

    render/output/:
      src:
        filter: nearest
        buffer: tile
      shader: rotozoomer

    show: output
  `)

  loopin.testImage( 'tile' )

  const texturePath = 'render/output/src/'

  return Promise.resolve()
  .then( () => loopin.testPatchAndDisplay( { wrap: 'clamp' }, texturePath ) )
  .then( () => loopin.testPatchAndDisplay( { wrapH: 'repeat' }, texturePath ) )
  .then( () => loopin.testPatchAndDisplay( { filter: 'linear' }, texturePath ) )
  .then( () => loopin.testPatchAndDisplay( { wrap: 'none' }, texturePath ) )
} )
