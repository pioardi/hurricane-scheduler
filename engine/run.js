/**
 * This is designed to run jobs in a new child process , passing some arguments into the child env.
 * This module will handle retries,stats and alerting.
 * @author Alessandro Pio Ardizio
 */
'use strict'
let log = require('../loggers/loggers').default;
const { spawn } = require('child_process');

let startJob = (j,now,attempts) => {
    let executionID = `${j.id}-${now}`;
    let childEnv = process.env;
    childEnv.JOB_ID = j.id;
    childEnv.JOB_TITLE = j.title;
    childEnv.JOB_TIMEOUT = j.timeout;
    childEnv.EXECUTION_ID = executionID;
    
    let opts = { cwd: __dirname, timeout: 100, env: childEnv };
    const running = spawn('node', [`${__dirname}/scripts/${j.scriptId}.js`], opts);
    running.stdout.on('data', data => {
      log.info(`Received logs from the job with id ${j.id} and execution id ${executionID} : ${data}`);
    });
    running.stderr.on('data', data => {
      log.error(`Received error logs from the job with id ${j.id} and execution id ${executionID}: ${data}`);
    });
    running.on('close', handleClose(j, executionID, attempts, now));
    running.on('error' , err => {
      log.error(`Received an error from the job with id ${j.id} and execution id ${executionID} ${err}`);
    })
}

module.exports = { 
    startJob : startJob
}

function handleClose(j, executionID, attempts, now) {
    return code => {
        if (code == 0) {
            log.info(`job with id ${j.id} and execution id ${executionID} terminated successfully with code ${code}`);
            // upgrade stats
        }
        else {
            log.error(`job with id ${j.id} and execution id ${executionID} terminated with failure code ${code}`);
            if (attempts <= j.retries) {
                startJob(j, now, attempts + 1);
            }
            else {
                // definitive failure , upgrade stats
            }
        }
    };
}

