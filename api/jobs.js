/**
 * Handler functions for REST API.
 * @author Alessandro Pio Ardizio
 */
'use strict';
const ring = require('ring-election');
const { Job } = require('../data/model');
const moment = require('moment-timezone');
const log = require('../loggers/loggers').default;

let createJob = (req, res) => {
  let job = new Job();
  let partition = ring.follower.defaultPartitioner(job.id);
  buildJob(job, partition, req);
  let errors = validateJob(job);
  if(errors.length > 0){
    res.status(400).send(errors);
    return;
  }
  job.save((err, data) => {
    if (err) {
      log.error(err);
      res.status(500).send({ err: 'Interaction error with DB' });
    } else {
      log.info(data.id);
      res.status(201).send({ id: data.id });
    }
  });
};

let updateJob = (req, res) => {
  // TODO implement update function
};

let deleteJob = (req, res) => {
  Job.findById(req.params.id)
    .remove()
    .then((data) => {
      res.status(204).send();
    });
};

let getJob = (req, res) => {
  Job.findById(req.params.id, (err, data) => {
    if (err){
      log.error(err);
      res.status(500).send({ err: 'Interaction error with DB' });
    }
    else {
      res.status(200).send(data);
    }
  });
};

function buildJob(job, partition, req) {
  job.title = req.body.title;
  job.hours = req.body.hours;
  job.minutes = req.body.minutes;
  job.timezone = req.body.timezone;
  job.weekDays = req.body.weekDays;
  job.monthsOfTheYear = req.body.monthsOfTheYear;
  job.daysOfTheMonth = req.body.daysOfTheMonth;
  job.years = req.body.years;
  job.scriptId = req.body.scriptId;
  job.partition = partition;
  job.retries = req.body.retries || 0;
  job.timeout = req.body.timeout || 60000;
}

function validateJob(job) {
  let errors = [];
  validateHours(job,errors);
  validateMinutes(job,errors);
  validateMonthsOfTheYear(job,errors);
  validateDaysOfTheMonth(job,errors);
  validateTimezone(job,errors);
  validateWeekDays(job,errors);
  return errors;
}
function validateTimezone(job,errors) {
  let isTimezoneValid = moment.tz.names().indexOf(job.timezone) >= 0;
  if (!isTimezoneValid) {
    errors.push({message : `TIMEZONE DOES NOT EXIST , INSERT A VALID TIMEZONE ${moment.tz.names()}`});
  }
}

function validateMonthsOfTheYear(job,errors) {
  if(!job.monthsOfTheYear)
    return;
  let allMontshAreValid = job.monthsOfTheYear.every(m => m >= 0 && m <= 11);
  if (!allMontshAreValid) {
    errors.push({ message : 'MONTHS ARE NOT VALID, ALL MONTHS MUST BE BETWEEN 0 AND 11'});
  }
}

function validateDaysOfTheMonth(job,errors) {
  if(!job.daysOfTheMonth)
    return;
  let allDaysOfTheMonthAreValid = job.daysOfTheMonth.every(m => m >= 0 && m <= 30);
  if (!allDaysOfTheMonthAreValid) {
    errors.push({ message : 'DAYS OF THE MONTH ARE NOT VALID, ALL MONTHS MUST BE BETWEEN 0 AND 30'});
  }
}

function validateWeekDays(job,errors) {
  if(!job.weekDays)
    return;
  let allWeekDaysValid = job.weekDays.every(m => m >= 0 && m <= 6);
  if (!allWeekDaysValid) {
    errors.push({ message : 'WEEK DAYS ARE NOT VALID, ALL MONTHS MUST BE BETWEEN 0 AND 6'});
  }
}


function validateMinutes(job,errors) {
  if(!job.minutes)return;
  let allMinutesAreValid = job.minutes.every(m => m >= 0 && m <= 59);
  if (!allMinutesAreValid) {
    errors.push({message: 'MINUTES ARE NOT VALID, ALL MINUTES MUST BE BETWEEN 0 AND 60'});
  }
}

function validateHours(job,errors) {
  if(!job.hours) return;
  let allHoursAreValid = job.hours.every(h => h >= 0 && h <= 23);
  if (!allHoursAreValid) {
    errors.push({message: 'HOURS ARE NOT VALID, ALL HOURS MUST BE BETWEEN 0 AND 23'});
  }
}

module.exports = {
  createJob: createJob,
  deleteJob: deleteJob,
  getJob: getJob,
  updateJob: updateJob
};

