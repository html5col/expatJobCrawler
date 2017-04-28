'use strict'
let dbUsername = process.env.dbUsername
let dbPassword = process.env.dbPassword
let mongoPort = process.env.MongoPort || 27017
console.log('db info: ', dbUsername, dbPassword, mongoPort)
module.exports = {
  port: process.env.SPIDER_API_PORT || 8005,
  mongodb: {
    port: mongoPort,
    // uri: `mongodb://60.205.219.251:${mongoPort}/jobData`, // ?authSource=groupForum
    uri: `mongodb://localhost:8000:27017/jobData`,
    dbname: 'jobData',
    options: {
      user: dbUsername || '',
      pass: dbPassword || '',
      db: { reconnectTries: Number.MAX_VALUE },
      server: {
        poolSize: 5
      }
    }
    // dbname: 'crawler',
    // host: 'localhost', // "192.168.3.148",//10.184.1.209
    // port: 27017,
    // user: '',
    // pass: '',
    // uri: 'mongodb://localhost:27017/expatsJobcrawlerChinaJob',  // 'mongodb://localhost:27017/expatsJobcrawlerTry'
    // options: {
    //   server: {
    //     poolSize: 5
    //   }
    // }
  },
  'crawlers': {
    'chinajob': {
      'run': true,
      'strategy': 'continue',
      'website': 'chinajob.com',
      'location': 'job1',
      'jobsConfig': {
        'src/jobs/common/boot.js': {
          'thread': 'master'
        },
        'src/jobs/instance/chinaJob/GetPostNumber.js': {
          'thread': 'worker',
          'count': 1
        },
        'src/jobs/instance/chinaJob/GetDetail.js': {
          'thread': 'worker',
          'count': 1
        }
      },
      'jobStatus': {
        'GetPostNumber': false, // should be the class name of each job
        'GetDetail': false
      },
      'initUrl': 'http://www.chinajob.com/individual/my_teacherlist.php?offset=%d',
      'detailPageBase': 'http://www.chinajob.com/jobposter/teacher/jobdetail.php?job_id=%d'
    },
    'jobSiteChina': {
      'run': true,
      'strategy': 'continue',
      'website': 'jobsitechina.com',
      'location': 'job2',
      'jobsConfig': {
        'src/jobs/common/boot.js': {
          'thread': 'master'
        },
        'src/jobs/jobsitechina/Link.js': {
          'thread': 'worker',
          'count': 1
        },
        'src/jobs/jobsitechina/Detail.js': {
          'thread': 'worker',
          'count': 1
        }
      },
      'jobStatus': {
        'Link': false, // should be the class name of each job
        'Detail': false
      },
      'initUrl': 'http://www.jobsitechina.com/EmployerPositionSearch_cn.aspx'
      //'detailPageBase': 'http://www.jobsitechina.com/EmployerPositionView_cn.aspx?ID=%d'
    }

  }

}
