var schedule = require('node-schedule')
// const Crawler = require('./')
console.log('scheduling...')
//let sched = '0 14 * * *'
let sched = '30 11 * * *'
// let env = process.env.NODE_ENV || 'test'
// if (env === 'test') {
//   sched = '1 * * * * * *'
// }

var j = schedule.scheduleJob(sched, function () {
  console.log('start 2pm every day! starting...')
  require('../../index.js')
})
