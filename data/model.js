'use strict';
const mongoose = require('mongoose');
let connectionString = process.env.DATA_SOURCE_CONNECTION_URL || 'mongodb://test:test@ds139781.mlab.com:39781/pioardi';
mongoose.connect(connectionString , {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;
const Job = new Schema({
  title: String,
  hours: [String],
  minutes: [String],
  timezone: String,
  weekDays: [String],
  daysOfTheMonth: [String],
  monthsOfTheYear: [String],
  years: [String],
  scriptId: String,
  retries: Number,
  timeout: Number,
  partition: String
});

const History = new Schema({
  executionID: String,
  result: String,
  startTime: Date,
  title: String,
  jobID: String,
  scriptId: String,
  host: String
});


const JobModel = mongoose.model('Job', Job);
const HistoryModel = mongoose.model('History', History);


module.exports = {
  Job: JobModel,
  History: HistoryModel
};