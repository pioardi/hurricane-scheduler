const ring = require('ring-election');
const { Job } = require('../data/data');

let createJob = (req, res) => {
  let job = new Job();
  let partition = ring.follower.defaultPartitioner(job.id);
  buildJob(job, partition, req);
  job.save((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ err: 'Interaction error with DB' });
    } else {
      console.log(data.id);
      res.status(201).send({ id: data.id });
    }
  });
};

let deleteJob = (req, res) => {
  Job.findById(req.params.id).remove().then((data)=>{
    res.status(204).send();
  });
};

let getJob = (req, res) => {
  Job.findById(req.params.id , (err,data) => {
    if(err) throw err;
    else{
      res.status(200).send(data);
    }
  })
};

function buildJob(job, partition, req) {
  job.partition = partition;
  job.hour = req.body.hour;
  job.minute = req.body.minute;
  job.scriptId = req.body.scriptId;
  job.title = req.body.title;
}

module.exports = {
  createJob: createJob,
  deleteJob: deleteJob,
  getJob: getJob,
};

