'use strict';

var expect = require('chai').expect;
var parseDate = require('../../src/parse-date');

describe('parse-date', function () {
  var describes = {
    'returns empty month and empty year': [
      ['', {month: '', year: ''}],
      [' ', {month: '', year: ''}],
      ['/', {month: '', year: ''}],
      [[], {month: '', year: ''}]
    ],
    'returns month and empty year': [
      ['12', {month: '12', year: ''}],
      ['12 ', {month: '12', year: ''}],
      ['12/', {month: '12', year: ''}],
      [['12'], {month: '12', year: ''}]
    ],
    'returns month and year with ambiguous expiration dates': [
      ['122', {month: '12', year: '2'}],
      ['920', {month: '9', year: '20'}],
      ['120', {month: '1', year: '20'}],
      ['022', {month: '02', year: '2'}],
      ['12 2', {month: '12', year: '2'}],
      ['12/2', {month: '12', year: '2'}],
      [['12', '2'], {month: '12', year: '2'}]
    ],
    'returns month and year': [
      ['1222', {month: '12', year: '22'}],
      ['12 22', {month: '12', year: '22'}],
      ['12/22', {month: '12', year: '22'}],
      [['12', '22'], {month: '12', year: '22'}]
    ]
  };

  Object.keys(describes).forEach(function (key) {
    var tests = describes[key];

    describe(key, function () {
      tests.forEach(function (test) {
        var arg = test[0];
        var output = test[1];

        it('returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
          expect(parseDate(arg)).to.deep.equal(output);
        });
      });
    });
  });
});
