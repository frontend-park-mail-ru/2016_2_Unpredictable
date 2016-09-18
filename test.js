let assert = require('assert');
let hello = require('./public/main').hello;
let plural = require('./public/main').plural;
let filter = require('./public/main').filter;

assert.equal(hello('Test'), 'Привет, Test');

// assert.equal(plural(0), '0 раз!');
// assert.equal(plural(1), '1 раз!');
// assert.equal(plural(2), '2 раза!');
// assert.equal(plural(10), '10 раз!');
// assert.equal(plural(12), '12 раз!');
// assert.equal(plural(13), '13 раз!');
// assert.equal(plural(15), '15 раз!');
// assert.equal(plural(100), '100 раз!');
// assert.equal(plural(100), '100 раз!');
// assert.equal(plural(103), '103 раза!');

assert.equal(filter('KEK'), '***');
assert.equal(filter('Kek'), '***');
assert.equal(filter('kek'), '***');
assert.equal(filter('kEk'), '***');
assert.equal(filter('KEKs'), 'KEKs');
assert.equal(filter('KEKs kekkek kek Kek Keeek KEk'), 'KEKs kekkek *** *** Keeek ***');
assert.equal(filter('Apple'), '*****');
assert.equal(filter('OrangeJuce'), '**********');
assert.equal(filter('Orange Orange'), '****** ******');

