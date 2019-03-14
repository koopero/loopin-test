require('../index').test( 'render-enable-test', function ( loopin ) {
  loopin.patchYAML(`
    buffer:
      test: 
        width: 1
        height: 1

    pixels:
      red:
        format: hex2
        data: 'f00'
      
      green:
        format: hex2
        data: '0f0'

    render:
      test:
        layer:
          green:
            src: green
          
          red: 
            src: red
            enable: false

    show: test
  `)

  // TODO: Check if output is green
  return loopin.testDelay(30000)
})
