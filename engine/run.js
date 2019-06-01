/**
 * This is designed to run jobs in a new child process , passing some arguments into the child env.
 * This module will handle retries,stats and alerting.
 * @author Alessandro Pio Ardizio
 */
'use strict'
let log = require('../loggers/loggers').default;
const { spawn } = require('child_process');

let startJob = (j) => {
    let childEnv = process.env;
    childEnv.JOB_ID = j.id;
    childEnv.JOB_TITLE = j.title;
    childEnv.JOB_TIMEOUT = j.timeout;
    let opts = { cwd: __dirname, timeout: 100, env: childEnv };
    const running = spawn('node', [`${__dirname}/scripts/${j.scriptId}.js`], opts);
    running.stdout.on('data', data => {
      log.info(`Received logs from the job with id ${j.id}: ${data}`);
    });
    running.stderr.on('data', data => {
      log.error(`Received error logs from the job with id ${j.id} : ${data}`);
    });
    running.on('close', code => {
        if(code == 0)
            log.info(`job with id ${j.id} terminated successfully with code ${code}`);
        else
            log.error(`job with id ${j.id} terminated successfully with code ${code}`);
    });
    running.on('error' , err => {
      log.error(`Received an error from the job with id ${j.id} ${err}`);
    })
}

module.exports = { 
    startJob : startJob
}

