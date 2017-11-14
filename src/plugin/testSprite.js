module.exports = testSprite

testSprite.options = require('boptions')({
  '#inline': ['buffer'],
  buffer: 'sprite',
})

function testSprite() {
  const loopin = this
      , opt = testSprite.options( arguments )
      , result = {}

  result.buffer = opt.buffer
  result.src = 'image/shittyBear.png'

  loopin.plugin( 'image' )

  return loopin.image( result.buffer, result.src )
  .then( () => result )
}
