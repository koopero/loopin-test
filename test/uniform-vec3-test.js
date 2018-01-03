require('../index').test( 'uniform-vec3', async function ( loopin ) {

  loopin.patchYAML( `
    render/output:
      src: input
      shader: solid3

    uniform/vec3/colour: [ 1, 0, 1 ]

    buffer:
      output:
        width: 1
        height: 1

    osd/text: should be magenta

    show: output
  ` )

  await loopin.testDelay()

  loopin.patchYAML( `
    uniform/vec3/colour:
      red: 0
    osd/text: should be blue
  ` )

  await loopin.testDelay()

  loopin.patchYAML( `
    uniform/vec3/colour: 0.5
    osd/text: should be grey
  ` )

  await loopin.testDelay()

} )
