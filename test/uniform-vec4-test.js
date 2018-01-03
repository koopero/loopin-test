require('../index').test( 'uniform-vec3', async function ( loopin ) {

  loopin.patchYAML( `
    render/output:
      src: input
      shader: solid4

    uniform/vec4/colour: [ 1, 0, 1, 0.5 ]

    buffer:
      output:
        width: 1
        height: 1

    osd/text: should be dark magenta

    show:
      buffer: output
      alpha: multiply
  ` )


  await loopin.testDelay()
  console.log( await loopin.read('uniform') )

} )
