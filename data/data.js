const mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds139781.mlab.com:39781/pioardi', {useNewUrlParser: true});

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;
const Job = new Schema({
  title: String,
  hour: String,
  minute: String,
  scriptId: String, 
  partition: String
});


const JobModel = mongoose.model('Job', Job);

module.exports = {
    Job: JobModel,
}
