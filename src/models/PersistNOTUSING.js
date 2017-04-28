'use strict'
const mongoose = require('mongoose')

const PersistSchema = new mongoose.Schema({
  // website: String,
  jobStatus: mongoose.Schema.Types.Mixed
})

let Persist
if (mongoose.models.Crawler) {
  Persist = mongoose.model('Persist')
} else {
  Persist = mongoose.model('Persist', PersistSchema)
}

module.exports = Persist
