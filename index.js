'use strict'
/* This config is helpful for development and test ,in production 
* will be used environment variables 
*/
let config = require('./config/config.js');
let configObject = require('./config/config.json');
config(configObject);
let engine = require('./engine');
engine.tick();