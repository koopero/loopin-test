require('../index').test( 'displace', 'shader-test', function ( loopin ) {
  return loopin.Promise.resolve()
  .then( () => loopin.testAnimate('render/output/float/amount', 0.2, 5 ) )
} )
