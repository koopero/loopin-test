module.exports = testImage

testImage.options = require('boptions')({
  '#inline': ['buffer'],
  buffer: 'image',
})

function testImage() {
  const loopin = this
      , opt = testImage.options( arguments )
      , result = {}

  result.buffer = opt.buffer
  result.src = 'image/tile.png'

  loopin.plugin( 'image' )

  return loopin.image( result.buffer, result.src )
  .then( () => result )
}
