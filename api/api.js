let express = require('express')
let app = express()
let middlewares = require('./middlewares')
const jobs = require('./jobs')

// Configure REST interceptors
// open tracing standard
app.use(middlewares.openTracing)
app.use(express.json())

// expose REST API
app.get('/schedules/:id', jobs.getJob)
app.post('/schedules', jobs.createJob)
app.delete('/schedules/:id', jobs.deleteJob)
let port = process.env.JOB_PORT || 3030
app.listen(port)