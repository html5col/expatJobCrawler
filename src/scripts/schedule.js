var schedule = require('node-schedule')
// const Crawler = require('./')
console.log('scheduling...')
//let sched = '0 14 * * *'
let sched = '0 2 * * *'
let env = process.env.NODE_ENV || 'test'
if (env === 'test') {
  sched = '* 11 * * *'
}else if(env === 'chinaJob'){
  sched = '0 5 * * *'
}

var j = schedule.scheduleJob(sched, function () {
  console.log('start at 2am every day! starting...')
  require('../../index.js')
})
