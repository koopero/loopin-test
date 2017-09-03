/**
  Test wrapper
*/
module.exports = test

const path = require('path')

test.resolveData = path.resolve.bind( null, __dirname, '..' )

test.options = require('boptions')({
  '#inline': ['name','description', 'func'],
  'name': 'anonymous-test',
  'description': '',
  'func': '#function',
  'waitForBootstrap': true
})


function test ( func ) {
  const opt = test.options( arguments )


  if ( global.describe ) {
    wrapMocha()
  } else {
    return run()
  }

  function wrapMocha() {
    describe( opt.name, function () {
      it('works', function ( cb ) {
        run()
        .then( () => cb() )
      })
    } )
  }


  function run() {
    const Loopin = require('loopin')
        , loopin = Loopin()
        , Promise = loopin.Promise

    loopin.plugin('files')
    loopin.filesRoot( test.resolveData() )

    loopin.plugin('presetDir', { autoload: false } )
    loopin.plugin('preset')

    loopin.preset( opt.name )


    loopin.plugin('log')
    loopin.plugin( require('./plugin') )

    loopin.patch( opt.name, 'window/title')
    loopin.patch( opt.name, 'osd/client')


    if ( opt.preset ) {
      loopin.preset( opt.preset )
    }

    var promise = Promise.resolve()

    if ( opt.func && !opt.waitForBootstrap ) {
      promise = promise.then( () => opt.func( loopin ) )

    }

    promise = promise.then( () => loopin.plugin('bootstrap', {
      native: {
        verbose: true,
        runCwd: test.resolveData()
      }
    }))

    if ( opt.func && opt.waitForBootstrap ) {
      promise = promise.then( () => opt.func( loopin ) )
    }

    promise = promise.then( function() {
      return loopin.close()
    })

    return promise
  }
}
