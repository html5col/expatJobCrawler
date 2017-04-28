'use strict'
const coHandler = require('../common/co-handler')
const ChinaJobDetail = require('../models/instance/chinaJob/ChinaJobDetail')
const JobSiteChinaDetail = require('../models/jobsitechina/JobDetail')
const JobDetail = require('../models/JobDetail')

let chinaJobDetails = ChinaJobDetail.find({}, {_id: 0}).cursor()
let jobSiteChinaDetails = JobSiteChinaDetail.find({}, {_id: 0}).cursor()

function merge (instance) {
  coHandler(function * () {
    for (let doc = yield instance.next(); doc != null; doc = yield instance.next()) {
      let docExist = yield JobDetail.findOne({url: doc.url}).exec()
      if (docExist) {
        console.log('doc existing, next...')
        continue
      } else {
        let jobDetail = new JobDetail(doc)
        yield jobDetail.save()
      }
    }
  })
}

module.exports = function () {
  coHandler(function * () {
    //   for (let doc = yield chinaJobDetails.next(); doc != null; doc = yield chinaJobDetails.next()) {
    //     let docExist = yield JobDetail.findOne({url: doc.url}).exec()
    //     if (docExist) {
    //       continue
    //     } else {
    //       let jobDetail = new JobDetail(doc)
    //       yield jobDetail.save()
    //     }
    //   }
    merge(chinaJobDetails)
    merge(jobSiteChinaDetails)

    //   for (let doc = yield jobSiteChinaDetails.next(); doc != null; doc = yield jobSiteChinaDetails.next()) {
    //     let docExist = yield JobDetail.findOne({url: doc.url}).exec()
    //     if (docExist) {
    //       continue
    //     } else {
    //       let jobDetail = new JobDetail(doc)
    //       yield jobDetail.save()
    //     }
    //   }

    console.log('finish transfering data to JobDetail model...')
  })
}
