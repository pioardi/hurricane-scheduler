'use strict'
let log = require('../loggers/loggers').default
log.info('Engine required')
const Rx = require('@reactivex/rxjs');

let subscription =
    Rx.Observable
        .interval(60 * 1000 /* 1m */)
        .timeInterval()
        .subscribe((x) => {
            log.debug('Minute tick')
        })


module.exports = {
    reactiveTick: subscription
}