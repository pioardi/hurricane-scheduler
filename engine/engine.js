'use strict';
let log = require('../loggers/loggers').default;
log.info('Engine required');
const Rx = require('@reactivex/rxjs');
const fs = require('fs');
const ring = require('ring-election');
const { Job } = require('../data/data');

if(process.env.IS_LEADER){
    ring.leader.createServer();
}else{
    ring.follower.createClient();
}


let superproce = x => {
  log.debug('Minute tick');
  // to get assigned partitions
  let assignedPartitions = ring.follower.partitions();
  console.log(assignedPartitions);
  assignedPartitions.forEach(partition => {
    Job.find({partition: partition} , (err,jobs) => {
      jobs.forEach(j => {console.log(`Job in partition ${partition} and id ${j.id} assigned to me `)})
    })
  })
};

let subscription = Rx.Observable.interval(5000 /* 1m */)
  .timeInterval()
  .map(e => {
    return;
  })
  .subscribe(superproce);

module.exports = {
  reactiveTick: subscription
};
