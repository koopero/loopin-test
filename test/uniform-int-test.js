require('../index').test( 'uniform-int', async function ( loopin ) {

  let rgb = 0xff00ff

  loopin.patchYAML( `
    render/output:
      src: input
      shader: integerRGB

    uniform/int/rgb: ${rgb}

    buffer:
      output:
        width: 1
        height: 1

    osd/text: should be magenta

    show: output
  ` )

  await loopin.testDelay()

} )
