const H = require('horten')
new H.Tracer( {
  path: 'loopin/',
  listening: true
})

require('../index').test( 'horten-test', function ( loopin ) {
  loopin.plugin('horten', 'loopin/')

  H.root.patch( 'out', 'loopin/show')
  H.root.patch( 'image/bars.png', 'loopin/image/out/src' )

  return loopin.testDelay()
})
