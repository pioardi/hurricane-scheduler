'use strict'
const mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds139781.mlab.com:39781/pioardi', {useNewUrlParser: true});

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;
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
  retries : Number,
  timeout : Number, 
  partition: String
});


const JobModel = mongoose.model('Job', Job);

module.exports = {
    Job: JobModel,
}
