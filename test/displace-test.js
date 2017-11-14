require('../index').test( 'displace', async function ( loopin ) {
  loopin.patchYAML( `
    image:
      input: image/bars.png
      displace: image/rgClouds.jpg

    render:
      output:
        src: input
        shader: displace

        float:
          amount: 0

        texture/displace:
          buffer: displace

    buffer:
      output:
        width: 1920
        height: 1080

    show: output
  ` )

  await loopin.testAnimate('render/output/float/amount', 0.2, 5 )
} )
