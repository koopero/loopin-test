require('../index').test( 'composite', function ( loopin ) {

  loopin.preset('composite')

  return loopin.Promise.resolve()
  .then( () => loopin.testImage('background', 'sky') )
  .then( ( image ) => loopin.testPatchAndDisplay( image, 'image' ) )
  .then( () => loopin.testAnimate('render/output/float/amount', 0.2, 5 ) )
} )
