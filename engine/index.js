'use strict'
let log = require('../loggers').default;
log.info('Engine required');
let tick = () => {
    setTimeout(() => {
        log.trace('tick');
        tick();
    }, 60 * 1000);
};
/**
 * Tick function will be repeated each minute.
 */
let toExport = {
    tick: tick
}
module.exports = toExport;

