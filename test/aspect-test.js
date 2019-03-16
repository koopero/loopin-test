const _ = require('lodash')

const ROTATE_AXES = [
  'render/output/transform/rotate',
  'camera/view/roll',
  'camera/view/yaw',
  'camera/view/pitch'
]

const GATES = [
  { image: 'image/30x10.png', aspect: 30/10 },
  { image: 'image/33x33.png', aspect: 1 },
  { image: 'image/16x9.png', aspect: 16/9 },
]

require('../index').test( 'aspect-test', function ( loopin ) {
  const Promise = loopin.Promise
  const layerPath = 'render/output/'

  loopin.preset('aspect-test')

  return Promise.resolve()
  .then( resetRotation )
  .then( testGate )
  .then( setRandomWindowSize )
  .then( testTransformMode )
  .then( testRotation )





  function setRandomWindowSize() {
    const width = randInt( 640, 1600 )
        , height = randInt( 120, 720 )
        , aspect = Math.pow( 10, Math.random() * 2 - 1 )

    loopin.patch( aspect, 'buffer/output/aspect' )
    if ( aspect > 1 ) {
      loopin.patch( { width: width / aspect, height: height }, 'buffer/output/' )
    } else {
      loopin.patch( { width: width, height: height * aspect }, 'buffer/output/' )
    }

    return loopin.testPatchAndDisplay( { width: width, height: height }, 'window/' )
  }

  function resetRotation() {
    ROTATE_AXES.map( ( axis ) => loopin.patch( 0, axis ) )
  }


  function testRotation() {
    let rotateAxis = loopin.testRandom( ROTATE_AXES )
    return loopin.testAnimate( rotateAxis, randInt( -360, 360 ) )
  }

  function testGate() {
    const gate = loopin.testRandom( GATES )
        , image = gate.image
        , aspect = gate.aspect

    loopin.patch( aspect, 'mesh/sprite/aspect' )
    console.log("********* IMAGE", image )
    return loopin.testPatchAndDisplay( image, 'image/gate' )
  }

  function testTransformMode() {
    let mode = loopin.testRandom(['cover','contain'])
    return loopin.testPatchAndDisplay( mode, 'render/output/transform/mode' )
  }

} )

function rand( v ) {
  v = parseFloat(v) || 1
  return Math.random() * v
}

function randInt( min, max  ) {
  return Math.floor( ( max - min ) * Math.random() ) + min
}
