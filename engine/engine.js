/**
 * This module when loaded will execute a minute interval tick.
 * For each tick it will check assigned partitions and will run jobs if is the correct time.
 * When a job must run , a new child process will be spawned. 
 * @author Alessandro Pio Ardizio
 */
'use strict';
let log = require('../loggers/loggers').default;
log.info('Engine required');
const Rx = require('@reactivex/rxjs');
const fs = require('fs');
const ring = require('ring-election');
const moment = require('moment-timezone');
const run = require('./run');
const { Job } = require('../data/data');

if (process.env.IS_LEADER) {
  log.info('Starting as leader');
  let leader = ring.leader;
  leader.createServer();
  leader.startMonitoring();
} else {
  log.info('Starting as follower');
  let follower = ring.follower;
  follower.createClient();
  follower.startMonitoring();
}


let superproce = x => {
  log.debug('Minute tick');
  // to get assigned partitions
  if (!process.env.IS_LEADER) {
    let assignedPartitions = ring.follower.partitions();
    log.info(assignedPartitions);
    assignedPartitions.forEach(partition => {
      Job.find({ partition: partition }, (err, jobs) => {
        checkJobs(jobs, partition);
      });
    });
  }
};

// TODO Reset 1 minute as tick
let subscription = Rx.Observable.interval(10000 /* 1m */)
  .timeInterval()
  .map(e => {
    return;
  })
  .subscribe(superproce);

/**
 * For each job in input it check if it should run.
 */
function checkJobs(jobs, partition, now) {
  jobs.forEach(j => {
    let now = moment().tz(j.timezone);
    log.info(`Job in partition ${partition} and id ${j.id} assigned to me `);
    let toRun = shouldRun(j, now);
    if (toRun) {
      run.startJob(j,now);
    }
  });
}

/**
 * This method will check if the job j should run.
 * @param {*} j the job to check
 * @param {*} now  the actual time into the timezone configured for j
 * @returns true if the job should run , else false
 */
function shouldRun(j, now) {
  let checkHours = true;
  let checkMinutes = true;
  let checkWeekDays = true;
  let checkMonthsOfTheYear = true;
  let checkDaysOfTheMonth = true;
  if (j.weekDays.length > 0) {
    checkWeekDays = j.weekDays.indexOf(now.day()) >= 0;
  }
  if (j.monthsOfTheYear.length > 0) {
    checkMonthsOfTheYear = j.monthsOfTheYear.indexOf(now.month()) >= 0;
  }
  if (j.daysOfTheMonth.length > 0) {
    checkDaysOfTheMonth = j.daysOfTheMonth.indexOf(now.date()) >= 0;
  }
  if (j.hours.length > 0) {
    checkHours = j.hours.indexOf(now.hour()) >= 0;
  }
  if (j.minutes.length > 0) {
    checkMinutes = j.minutes.indexOf(now.minute()) >= 0;
  }
  return (
    checkMonthsOfTheYear &&
    checkWeekDays &&
    checkDaysOfTheMonth &&
    checkHours &&
    checkMinutes
  );
}

module.exports = {
  reactiveTick: subscription
};
