require('../index').test( 'feedback-test', 'feedback', function ( loopin ) {
  loopin.patchYAML(`
    image/pattern: image/pattern.png

    buffer:
      output:
        format: rgba32

    render:
      output:
        advance: true
        clear: true
        shader: feedback
        blend: none

        src:
          buffer: output
          filter: linear

        layer/a:
          advance: false
          passes: 1
          blend: alpha
          src: pattern
          shader: rotozoomer


    show: output

  `)


  return Promise.resolve()
  .then( () => loopin.testPatchAndDisplay( { speed: 0.5 }, 'clock/') )
  .then( () => loopin.testDelay( ) )
} )
