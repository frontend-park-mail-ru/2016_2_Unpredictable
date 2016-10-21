'use strict';

const assert = require('assert');
const filter = require('./public/filter').filter;

assert.equal(filter('KEK'), '***');
assert.equal(filter('Kek'), '***');
assert.equal(filter('kek'), '***');
assert.equal(filter('kEk'), '***');
assert.equal(filter('KEKs'), 'KEKs');
assert.equal(filter('KEKs kekkek kek Kek Keeek KEk'), 'KEKs kekkek *** *** Keeek ***');
assert.equal(filter('Apple'), '*****');
assert.equal(filter('OrangeJuce'), '**********');
assert.equal(filter('Orange Orange'), '****** ******');

// TODO: Перенести все тесты в папку test
assert.equal(true, false, 'Перенести все тесты в папку test');

