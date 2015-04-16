var expect = require('chai').expect;
var expirationDate = require('../../src/expiration-date');

describe('expirationDate validates', function () {
  var describes = {
    'valid expiration dates with slashes': [
      ['10 / 2016', {isValid: true, isPotentiallyValid: true, month: '10', year: '2016'}],
      ['10/2016', {isValid: true, isPotentiallyValid: true, month: '10', year: '2016'}],
      ['12 / 2016', {isValid: true, isPotentiallyValid: true, month: '12', year: '2016'}],
      ['01 / 2016', {isValid: true, isPotentiallyValid: true, month: '01', year: '2016'}],
      ['09 / 2016', {isValid: true, isPotentiallyValid: true, month: '09', year: '2016'}],
      ['01 / 16', {isValid: true, isPotentiallyValid: true, month: '01', year: '16'}],
      ['01  / 2016', {isValid: true, isPotentiallyValid: true, month: '01', year: '2016'}],
      ['01 /  2016', {isValid: true, isPotentiallyValid: true, month: '01', year: '2016'}]
    ],

    'invalid expiration dates with slashes': [
      ['11 / 11', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['00 / 2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['13 / 2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01 / 1999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01/1999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01 / 2100', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['10/123', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
    ],

    'ambiguous expiration dates with slashes': [
      ['11 / 1', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['01 / 201', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['01 / 211', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01 / 199', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01/199', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
    ],

    'valid expiration dates with no slashes': [
      ['102016', {isValid: true, isPotentiallyValid: true, month: '10', year: '2016'}],
      ['102016', {isValid: true, isPotentiallyValid: true, month: '10', year: '2016'}],
      ['122016', {isValid: true, isPotentiallyValid: true, month: '12', year: '2016'}],
      ['012016', {isValid: true, isPotentiallyValid: true, month: '01', year: '2016'}],
      ['092016', {isValid: true, isPotentiallyValid: true, month: '09', year: '2016'}],
      ['1219', {isValid: true, isPotentiallyValid: true, month: '12', year: '19'}],
      ['0116', {isValid: true, isPotentiallyValid: true, month: '01', year: '16'}]
    ],

    'valid space separated month and year': [
      ['01 2019', {isValid: true, isPotentiallyValid: true, month: '01', year: '2019'}],
      ['01 2020', {isValid: true, isPotentiallyValid: true, month: '01', year: '2020'}],
      ['01 19', {isValid: true, isPotentiallyValid: true, month: '01', year: '19'}],
      ['01 21', {isValid: true, isPotentiallyValid: true, month: '01', year: '21'}]
    ],

    'invalid expiration dates with no slashes': [
      [' ', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['  ', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['1111', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['002016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['132016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['011999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['011999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['012100', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
    ],

    'ambiguous expiration dates with no slashes': [
      ['011', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['111', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['01201', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['01211', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01199', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01199', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
    ],

    'empty strings': [
      ['', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['/', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      [' / ', {isValid: false, isPotentiallyValid: true, month: null, year: null}]
    ],

    'non-strings': [
      [[], {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [{}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [null, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [undefined, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [Infinity, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [0 / 0, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [0, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [1, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [2, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [12, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [-1, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [-12, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      [2015, {isValid: false, isPotentiallyValid: false, month: null, year: null}]
    ],

    'malformed strings': [
      ['foo', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['1.2', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['1 2', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['1 ', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      [' 1', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
      ['01 / 20015', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['15  / 2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01 / 2016 / 2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01 / 16/2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
      ['01 / 2016 / 01 / 2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
    ]
  };

Object.keys(describes).forEach(function (key) {
  var tests = describes[key];
  describe(key, function () {
    tests.forEach(function (test) {
      var arg = test[0];
      var output = test[1];

      it('and returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
        expect(expirationDate(arg)).to.deep.equal(output);
      })
    });
  });
});
});
