require('../index').test( 'mouse-test', 'sprite', function ( loopin ) {

  loopin.preset('sprite')
  loopin.plugin('mouse')
  loopin.plugin('animate')
  loopin.animate( function ( frame ) {
    loopin.patch( {
      x: loopin.mouseX(),
      y: loopin.mouseY(),
      scale: loopin.mouseDown() * 0.3 + 0.2
    }, 'render/output/layer/0/transform/' )
    // console.log('test-animate', frame )
  } )

  return loopin.testSprite()
  .then( () => loopin.testImage('background') )
  .then( () => loopin.testDelay( 5000 ) )
} )
