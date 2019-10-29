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


async function test ( func ) {
  const opt = test.options( arguments )


  if ( global.describe ) {
    wrapMocha()
  } else {
    return run()
  }

  function wrapMocha() {
    describe( opt.name, function () {
      it('works', async function () {
        await run()
      })
    } )
  }


  function run() {
    const Loopin = require('loopin')
        , loopin = Loopin()
        , Promise = loopin.Promise

    var error 

    loopin.plugin('files')
    loopin.filesRoot( test.resolveData() )

    loopin.plugin('presetDir', { autoload: false } )
    loopin.plugin('preset')

    loopin.preset( opt.name )


    loopin.plugin('log')
    loopin.logShow('patch')

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

    loopin.plugin( require('loopin-native'), { useEnv: true, verbose: true } )
    loopin.plugin( require('loopin-shaders') )


    promise = promise.then( () => loopin.bootstrap() )

    if ( opt.func && opt.waitForBootstrap ) {
      promise = promise.then( () => opt.func( loopin ) ).catch( err => error = err )
    }

    promise = promise.then( function() {
      return loopin.close()
    })

    promise = promise.then( async function() {
      if ( error )
        throw error
    } )

    return promise
  }
}
