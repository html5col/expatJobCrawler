'use strict'
let co = require('co')
// let logger = require('src/common/bunyanLogger')

module.exports = function (handle) {
  return co(handle).catch(function (err) {
    // /logger.error(err)
    throw new Error('error in coHandler '+ err.stack ? err.stack : err.message)
    // process.exit(-1)
  })
}
