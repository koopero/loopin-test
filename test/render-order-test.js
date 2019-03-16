require('../index').test( 'render-order-test', function ( loopin ) {
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
            order: 1
          
          red: 
            src: red
            order: 0

    show: test
  `)

  return loopin.testDelay()
})
