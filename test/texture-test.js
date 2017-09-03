require('../index').test( 'texture-test', 'rotozoomer', function ( loopin ) {

  const texturePath = 'render/output/src/'

  return Promise.resolve()
  .then( () => loopin.testPatchAndDisplay( { wrap: 'clamp' }, texturePath ) )
  .then( () => loopin.testPatchAndDisplay( { wrapH: 'repeat' }, texturePath ) )
  .then( () => loopin.testPatchAndDisplay( { filter: 'linear' }, texturePath ) )
  .then( () => loopin.testPatchAndDisplay( { wrap: 'none' }, texturePath ) )
} )
