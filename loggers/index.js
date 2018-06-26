let bunyan = require('bunyan');
let fs = require('fs');
// TODO make this configurable
var engineLog = bunyan.createLogger({
  name: 'engine',
  level: 'debug',
  stream: fs.createWriteStream('engine.log')
});

module.exports = {
  default: engineLog
}