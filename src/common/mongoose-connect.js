'use strict'
const config = require('src/common/get-config')
const mongodb = config.mongodb
const mongoose = require('mongoose')

let env = process.env.NODE_ENV || 'test'
if (env === 'test') {
  mongoose.connect(`mongodb://localhost:27017/data`, function (err) {
    if (err) {
      console.error(err)
      process.exit(0)
    }
    console.log('connnected')
  })
} else if (env === 'production') {
  mongoose.connect(`mongodb://${mongodb.options.user}:${mongodb.options.pass}@60.205.219.251:${mongodb.port}/data`, function (err) {
    if (err) {
      console.error(`Mongoose default connection error: ${err.stack}`)
      process.exit(0)
    }
  })
}
