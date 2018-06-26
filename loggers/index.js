'use strict'
let bunyan = require('bunyan');
let fs = require('fs');
var engineLog = bunyan.createLogger({
  name: 'engine',
  level: process.env.LOG_LEVEL_ENGINE,
  stream: fs.createWriteStream(process.env.LOG_FILE_ENGINE)
});

module.exports = {
  default: engineLog
}