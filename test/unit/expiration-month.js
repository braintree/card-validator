var expect = require('chai').expect;
var expirationMonth = require('../../src/expiration-month');

describe('expirationMonth', function () {
  var describes = {
    'returns false if not a string': [
      [[], {isValid: false, isPotentiallyValid: false}],
      [{}, {isValid: false, isPotentiallyValid: false}],
      [null, {isValid: false, isPotentiallyValid: false}],
      [undefined, {isValid: false, isPotentiallyValid: false}],
      [Infinity, {isValid: false, isPotentiallyValid: false}],
      [0 / 0, {isValid: false, isPotentiallyValid: false}],
      [0, {isValid: false, isPotentiallyValid: false}],
      [1, {isValid: false, isPotentiallyValid: false}],
      [2, {isValid: false, isPotentiallyValid: false}],
      [12, {isValid: false, isPotentiallyValid: false}],
      [13, {isValid: false, isPotentiallyValid: false}],
      [-1, {isValid: false, isPotentiallyValid: false}],
      [-12, {isValid: false, isPotentiallyValid: false}]
    ],

    'returns false for malformed strings': [
      ['foo', {isValid: false, isPotentiallyValid: false}],
      ['1.2', {isValid: false, isPotentiallyValid: false}],
      ['1/20', {isValid: false, isPotentiallyValid: false}],
      ['1 2', {isValid: false, isPotentiallyValid: false}],
      ['1 ', {isValid: false, isPotentiallyValid: false}],
      [' 1', {isValid: false, isPotentiallyValid: false}]
    ],

    'returns null for incomplete input': [
      ['', {isValid: false, isPotentiallyValid: true}],
      ['0', {isValid: false, isPotentiallyValid: true}]
    ],

    'valid month': [
      ['1', {isValid: true, isPotentiallyValid: true}],
      ['2', {isValid: true, isPotentiallyValid: true}],
      ['5', {isValid: true, isPotentiallyValid: true}],
      ['02', {isValid: true, isPotentiallyValid: true}],
      ['12', {isValid: true, isPotentiallyValid: true}]
    ],

    'invalid month': [
      ['14', {isValid: false, isPotentiallyValid: false}],
      ['30', {isValid: false, isPotentiallyValid: false}],
      ['-6', {isValid: false, isPotentiallyValid: false}],
      ['20', {isValid: false, isPotentiallyValid: false}],
      ['-1', {isValid: false, isPotentiallyValid: false}],
      ['13', {isValid: false, isPotentiallyValid: false}]
    ]
  };

  Object.keys(describes).forEach(function (key) {
    var tests = describes[key];
    describe(key, function () {
      tests.forEach(function (test) {
        var arg = test[0];
        var output = test[1];

        it('returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
          expect(expirationMonth(arg)).to.deep.equal(output);
        })
      });
    });
  });
});
