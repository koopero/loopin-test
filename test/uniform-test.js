require('../index').test( 'uniform', async function ( loopin ) {
  loopin.patchYAML( `
    render/output:
      src: input
      shader: solid
      float/red: 1

    shader/solid:
      frag: solid.frag
      float:
        green: 1

    uniform/float/blue: 1

    buffer:
      output:
        width: 1
        height: 1

    osd/text: Should be white

    show: output
  ` )

  await loopin.testDelay()

} )
