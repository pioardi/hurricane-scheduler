console.log(`executing a job that emulate a timeout , id : ${process.env.JOB_ID}`)

setTimeout(()=> {
    console.log('It is too late');
} , process.env.JOB_TIMEOUT * 2);