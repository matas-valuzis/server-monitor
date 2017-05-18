'use strict';

const assert = require('assert');
const app = require('../../../src/app').services;

describe('logs service', function() {
    const logs = {
        server: 'test',
        content: 'test'
    };

    let logEntity = {};

    it('creates new record', () => {
        app.service('logs').create(logs).then(
            s => {
                logEntity = s;
                assert(s._id);
            }
        );
    });

    it('finds new record', () => {
        app.service('logs').find({server: logs.server}).then(
            res => {
                assert(res.length > 0);
                assert(res[0]._id == logEntity._id);
            }
        );
    });

    it('remove new record', () => {
        app.service('logs').remove(logEntity._id).then(assert);
    });
});
