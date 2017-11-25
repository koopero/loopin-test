const _ = require('lodash')
require('../index').test( 'feedback-test', 'feedback', async function ( loopin ) {
  loopin.patchYAML(`
    image/pattern: image/pattern.png

    image/side: image/orientation.png

    buffer:
      output:
        format: rgba32

    buffer/sides:
      cols: 3
      rows: 2

    pixels/sides:
      format: hex2
      width: 3
      data: f00 0f0 00f 0ff f0f ff0

    render/output:
      src: sides
      clear: true
      mesh: cube
      face: front
      shader: cube
      camera: default
      texture/side: side

    mesh/cube:
      aspect: 1
      cube: true

    camera/default:
      zoom: -1
      fov: 30

    show: output

  `)

  await loopin.testIterate( async ( iteration) => {
    let axis = (['yaw','pitch'])[ iteration % 2 ]
    let to = _.random( 1, 8 ) * 45

    await loopin.testAnimate( `camera/default/${axis}`, to )
  })

} )
