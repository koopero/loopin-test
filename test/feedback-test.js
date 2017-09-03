require('../index').test( 'feedback-test', 'feedback', function ( loopin ) {

  loopin.preset('feedback')

  return Promise.resolve()
  .then( () => loopin.testPatchAndDisplay( { speed: 0.5 }, 'clock/') )
  .then( () => loopin.testDelay() )
} )
