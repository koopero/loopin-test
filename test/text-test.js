require('../index').test( 'text-test', 'text-test', function ( loopin ) {

  let phrase = loopin.testRandom( [
    'revolution without bloodshed',
    'art without effort',
    'careers without greed',
    'poetry without context',
  ])

  return Promise.resolve()
  .then( () => loopin.testPatchAndDisplay( phrase, 'text/text' ) )
} )
