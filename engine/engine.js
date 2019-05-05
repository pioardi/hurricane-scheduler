'use strict';
let log = require('../loggers/loggers').default;
log.info('Engine required');
const Rx = require('@reactivex/rxjs');
const fs = require('fs');
const ring = require('ring-election');
const { Job } = require('../data/data');

if (process.env.IS_LEADER) {
  ring.leader.createServer();
} else {
  ring.follower.createClient();
}

let superproce = x => {
  log.debug('Minute tick');
  // to get assigned partitions
  let assignedPartitions = ring.follower.partitions();
  console.log(assignedPartitions);
  assignedPartitions.forEach(partition => {
    Job.find({ partition: partition }, (err, jobs) => {
      let now = new Date();
      checkJobs(jobs, partition, now);
    });
  });
};

let script1 = id => {
  console.log(`Script 1 Executing job with id ${id}`);
};

let script2 = id => {
  console.log(`Script 2 Executing job with id ${id}`);
};

let subscription = Rx.Observable.interval(60000 /* 1m */)
  .timeInterval()
  .map(e => {
    return;
  })
  .subscribe(superproce);

function checkJobs(jobs, partition, now) {
  jobs.forEach(j => {
    console.log(`Job in partition ${partition} and id ${j.id} assigned to me `);
    if (now.getHours() == j.hour && now.getMinutes() == j.minute) {
      if (j.scriptId == 1) {
        script1(j.id);
      } else {
        script2(j.id);
      }
    }
  });
}

module.exports = {
  reactiveTick: subscription
};
