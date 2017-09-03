const bufferKey = 'indian'

require('../index').test( 'bufferFile', bufferKey, function ( loopin ) {
  loopin.plugin('bufferFile')

  return loopin.testImage()
  .then( ( image ) => loopin.testBenchmark( () => loopin.bufferFile( image.buffer ) ) )
} )
