module.exports = loopinTest

const _ = require('lodash')

loopinTest.options = require('boptions')({
  'delay': 2000,
  'iterations': 1,
  'animateDuration': 4000
})


function loopinTest( func ) {
  const opt = loopinTest.options( arguments )
      , loopin = this

  loopin.plugin('log')
  loopin.plugin('read')
  loopin.plugin('dispatch')

  loopin.testOptions = opt
  loopin.testLog = loopin.log.bind( loopin, '_test_')
  loopin.testBenchmark = testBenchmark.bind( loopin )
  loopin.testDelay = testDelay.bind( loopin )
  loopin.testResult = testResult.bind( loopin )
  loopin.testPatchAndDisplay = testPatchAndDisplay.bind( loopin )
  loopin.testAnimate = testAnimate.bind( loopin )
  loopin.testIterate = testIterate.bind( loopin )

  loopin.testRandom = require('./plugin/testRandom').bind( loopin )
  loopin.testImage = require('./plugin/testImage').bind( loopin )
  loopin.testSprite = require('./plugin/testSprite').bind( loopin )
}

async function testIterate( func ) {
  const loopin = this
  const iterations = parseInt( loopin.testOptions.iterations )
  for ( let i = 0; i < iterations; i ++ ) {
    await func( i )
  }
}

testBenchmark.options = require('boptions')({
  '#inline': ['func'],
  func: '#function',
})

function testBenchmark() {
  const loopin = this
      , opt = testBenchmark.options( arguments )

  if ( !opt.func )
    throw new Error('no function to benchmark')

  var startTime
    , endTime
    , duration

  return loopin.Promise.resolve()
  .then( function () {
    // Start clock
    startTime = new Date().getTime()
    loopin.logSection('benchmark')
  })
  .then( opt.func )
  .then( function( result ) {
    endTime = new Date().getTime()
    duration = endTime - startTime

    loopin.testLog( 'benchmark', { duration: formatTime( duration ) })
    loopin.testLog( 'result', { data: result } )
    return result
  })

  function formatTime( time ) {
    return time.toFixed(3)
  }
}

testDelay.options = require('boptions')({
  '#inline': ['duration'],
  duration: 2000
})

function testDelay() {
  const opt = testDelay.options( arguments )
      , loopin = this

  return new (loopin.Promise)( function ( resolve ) {
    setTimeout( resolve, opt.duration )
  })
}

testResult.options = require('boptions')({
  '#inline': ['path','name', 'delay'],
  path: '',
  name: 'result',
  delay: 200
})

function testResult() {
  const loopin = this
      , opt = testResult.options( arguments )

  return loopin.testDelay( opt.delay )
  .then( () => loopin.read( opt.path ) )
  .then( ( data ) => loopin.log( opt.path, opt.name, { data: data } ) )

}

function testPatchAndDisplay( data, path ) {
  const loopin = this
  let display = path+'\n'
  display += _.trim( require('js-yaml').dump( data ) )

  loopin.patch( display, 'osd/text/')
  loopin.patch( data, path )
  return loopin.testDelay()
}


testAnimate.options = require('boptions')({
  '#inline': ['path','to','from','duration' ],
  path: '',
  to: 1,
  from: NaN,
  duration: 0
})

async function testAnimate() {
  const loopin = this
      , opt = testAnimate.options( arguments )
      , path = opt.path

  var _startClock = NaN
    , _to = opt.to
    , _from = opt.from
    , duration = opt.duration


  if ( !duration )
    duration = parseInt( loopin.testOptions.animateDuration )


  if ( isNaN( _from ) )
    _from = parseFloat( await loopin.read( path ) )|| 0


  return new (loopin.Promise)( function ( resolve, reject ) {

    loopin.dispatchListen( 'frame', onFrame )

    function onFrame( event ) {
      const frame = event.data
      if ( isNaN( _startClock) ) {
        _startClock = parseFloat( frame.time )
      }

      loopin.patch( `${path}:\n  ${_from} => ${_to}`, 'osd/text' )

      var time = frame.time - _startClock
        , x = Math.min( 1, time / duration * 1000 )

      Promise.resolve( _from )
      .then( function ( _from ) {
        var value = _from + ( _to - _from ) * x
        loopin.patch( value, path )
      })

      if ( x >= 1 ) {
        resolve()
      } else {
        // Important! Tells loopin to keep the listener
        return true
      }
    }
  })
}
