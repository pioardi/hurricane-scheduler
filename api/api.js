/**
 * Start express app to serve REST requests
 * @author Alessandro Pio Ardizio
 */
'use strict';
let express = require('express');
let cors = require('cors');
let app = express();
let middlewares = require('./middlewares');
const jobs = require('./jobs');

// Configure REST interceptors
// open tracing standard
app.use(middlewares.openTracing);
app.use(express.json());
app.use(cors());


// expose REST API
app.get('/schedules/:id', jobs.getJob);
app.post('/schedules', jobs.createJob);
app.delete('/schedules/:id', jobs.deleteJob);
app.put('/schedules/:id' , jobs.updateJob);
let port = process.env.JOB_PORT || 3030;
app.listen(port);