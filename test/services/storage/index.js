'use strict';

const assert = require('assert');
const app = require('../../../src/app').services;

describe('storage service', function() {
    const storage = {
        server: 'test',
        used_inodes: 10,
        used_space: 1000,
    };

    let storageEntity = {};

    it('creates new record', () => {
        app.service('storage').create(storage).then(
            s => {
                storageEntity = s;
                assert(s._id);
            }
        );
    });

    it('finds new record', () => {
        app.service('storage').find({server: storage.server}).then(
            res => {
                assert(res.length > 0);
                assert(res[0]._id == storageEntity._id);
            }
        );
    });

    it('remove new record', () => {
        app.service('storage').remove(storageEntity._id).then(assert);
    });
});
