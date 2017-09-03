module.exports = testRandom

const _ = require('lodash')


function testRandom() {
  let args = _.flattenDeep( arguments )
  return _.sample( args )
}
