'use strict'
const { format } = require('util')
const SfdaErrors = require('src/consts/errors')
const Crawler = require('src/models/Crawler')
const JobDetail = require('src/models/JobDetail')
const coHandler = require('src/common/co-handler')
const logger = require('src/common/bunyanLogger')

class CommonJob {
  constructor (config) {
    this.config = config
  }

  finish () {
    const self = this

    return coHandler(function * () {
      const crawler = yield self.getCrawler()

      crawler.jobStatus = Object.assign({}, crawler.jobStatus, {
        [self.constructor.name]: true
      })
      yield crawler.save()
    })
  }

  merge (cursorInstance) {
    return coHandler(function * () {
      for (let doc = yield cursorInstance.next(); doc != null; doc = yield cursorInstance.next()) {
        let docExist = yield JobDetail.findOne({url: doc.url}).exec()
        if (docExist) {
          console.log('doc existing, next...')
          continue
        } else {
          console.log('storing detail to jobDetails...')
          console.log('doc is ' + JSON.stringify(doc))
          let jobDetail = new JobDetail()

          console.log('doc.website ' + doc.website)
          jobDetail.website = doc.website
          jobDetail.title = doc.title || ''
          jobDetail.searchQuery = doc.searchQuery || ''
          jobDetail.postingDate = doc.postingDate || ''

          jobDetail.url = doc.url || '' 
           //jobDetail.account = doc.account || ''
          jobDetail.country = doc.country || ''
          jobDetail.province = doc.province || ''

          jobDetail.city = doc.city || ''
          jobDetail.subject = doc.subject || ''
          jobDetail.jobName = doc.jobName || ''
          jobDetail.category = doc.category || ''
          jobDetail.expireDate = doc.expireDate || ''
          jobDetail.companyName = doc.companyName || ''
          jobDetail.industry = doc.industry || ''
          jobDetail.companyIntro = doc.companyIntro || ''
          jobDetail.positionNumber = doc.positionNumber || ''
          jobDetail.salary = doc.salary || ''
          jobDetail.welfare = doc.welfare || ''
          jobDetail.requirement = doc.requirement || ''
          jobDetail.responsibility = doc.responsibility  || ''
          jobDetail.phone = doc.phone || ''
          jobDetail.email = doc.email || ''
          jobDetail.officialSite = doc.officialSite || ''



          yield jobDetail.save()
          console.log('finishing storing detail to jobDetails...')
        }
      }
    })
  }
  // crawledBefore () {
  //   const self = this

  //   return coHandler(function * () {
  //     let persist = new Persist()
  //     persist.jobStatus = Object.assign({}, persist.jobStatus, {
  //       [self.constructor.name]: true
  //     })
  //   })
  // }

  dependency () {
    return ''// should be a class
  }

  dependencyDone () {
    const self = this

    return coHandler(function * () {
      const crawler = yield self.getCrawler()

      if (!crawler) {
        throw new Error(format(SfdaErrors.CAN_NOT_FIND_CRAWLER_ON_DATABASE, self.config.website, self.config.location))
      }

      return crawler.jobStatus[self.dependency()]
    })
  }

  getCrawler () {
    const self = this

    return coHandler(function * () {
      const crawler = yield Crawler.findOne({
        website: self.config.website
      })
     .exec()

      if (!crawler) {
        throw new Error(format(SfdaErrors.CAN_NOT_FIND_CRAWLER_ON_DATABASE, self.config.website, self.config.location))
      }

      return Promise.resolve(crawler)
    })
  }
}

module.exports = CommonJob
