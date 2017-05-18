'use strict';

const assert = require('assert');
const app = require('../../../src/app').services;


describe('keys service', function() {

    const testFile = {
        file_name: 'test',
        data: new Buffer('test').toString('base64')
    };
    it("don't find test file in key folder", () => {
        app.service('keys').find().then(keys => {
            assert(keys.filter(k => k == testFile.file_name).length < 1);
        });
    });

    it('creates new key file in folder', () => {
        app.service('keys').create(testFile).then(assert);
    });

    it('finds new key file in folder', () => {
        app.service('keys').find().then(keys => {
            assert(keys.filter(k => k == testFile.file_name).length > 0);
        });
    });

    it('removes key', () => {
        app.service('keys').remove(testFile.file_name).then(assert);
    });

    it("don't find test file in key folder", () => {
        app.service('keys').find().then(keys => {
            assert(keys.filter(k => k == testFile.file_name).length < 1);
        });
    });
});
