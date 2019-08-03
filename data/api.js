/**
 * Data layer API to abstract the underneath data source.
 * This will implement strategy design pattern , code that use data layer will be not aware of which data source is used.
 * @author Alessandro Pio Ardizio
 */
'use strict';

//   https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15

// encapsulation
class DataLayer{
    constructor(strategy){
        this.strategy = strategy;
    }
    createJob(job) {
        return strategy.createJob(job);
    }
}


// ------------------------ MONGO DB STRATEGY ------------------------
const {Job , History} = require('./model');
class MongoStrategy {
    createJob(job) {
      return this;
    }
    createHistory(history) {
        let h = new History();

        return this;
    }
}


// ------------------------ CASSANDRA STRATEGY ------------------------

class CassandraStrategy {
    createJob(job) {
      return this;
    }
    createHistory(history) {
        return this;
    }
}

// ------------------------ Strategy Handler ------------------------

let storageType = process.env.STORAGE_TYPE || 'mongo';
let api;
if(storageType === 'mongo'){
    api = new DataLayer(new MongoStrategy());
}else{
    api = new DataLayer(new CassandraStrategy());
}

module.exports = api;



