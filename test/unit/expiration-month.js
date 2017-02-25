'use strict';

var expect = require('chai').expect;
var expirationMonth = require('../../src/expiration-month');

var currentMonth = new Date().getMonth() + 1;
var previousMonth = currentMonth - 1 || 1;
var nextMonth = currentMonth < 12 ? currentMonth + 1 : currentMonth;

describe('expirationMonth', function () {
  var FALSE_VALIDATION = {isValid: false, isPotentiallyValid: false, isValidForThisYear: false};
  var TRUE_VALIDATION = {isValid: true, isPotentiallyValid: true, isValidForThisYear: true};

  var describes = {
    'returns false if not a string': [
      [[], FALSE_VALIDATION],
      [{}, FALSE_VALIDATION],
      [null, FALSE_VALIDATION],
      [undefined, FALSE_VALIDATION], // eslint-disable-line no-undefined
      [Infinity, FALSE_VALIDATION],
      [0 / 0, FALSE_VALIDATION],
      [0, FALSE_VALIDATION],
      [1, FALSE_VALIDATION],
      [2, FALSE_VALIDATION],
      [12, FALSE_VALIDATION],
      [13, FALSE_VALIDATION],
      [-1, FALSE_VALIDATION],
      [-12, FALSE_VALIDATION]
    ],

    'returns false for malformed strings': [
      ['foo', FALSE_VALIDATION],
      ['1.2', FALSE_VALIDATION],
      ['1/20', FALSE_VALIDATION],
      ['1 2', FALSE_VALIDATION],
      ['1 ', FALSE_VALIDATION],
      [' 1', FALSE_VALIDATION]
    ],

    'returns null for incomplete input': [
      ['', {isValid: false, isPotentiallyValid: true, isValidForThisYear: false}],
      ['0', {isValid: false, isPotentiallyValid: true, isValidForThisYear: false}]
    ],

    'valid month': [
      [currentMonth.toString(), TRUE_VALIDATION],
      [nextMonth.toString(), TRUE_VALIDATION],
      [
        '1',
        {
          isValid: true,
          isPotentiallyValid: true,
          isValidForThisYear: currentMonth <= 1
        }
      ],
      [
        '2',
        {
          isValid: true,
          isPotentiallyValid: true,
          isValidForThisYear: currentMonth <= 2
        }
      ],
      [
        '5',
        {
          isValid: true,
          isPotentiallyValid: true,
          isValidForThisYear: currentMonth <= 5
        }
      ],
      [
        '02',
        {
          isValid: true,
          isPotentiallyValid: true,
          isValidForThisYear: currentMonth <= 2
        }
      ],
      [
        '12',
        {
          isValid: true,
          isPotentiallyValid: true,
          isValidForThisYear: true
        }
      ]
    ],

    'invalid month': [
      ['14', FALSE_VALIDATION],
      ['30', FALSE_VALIDATION],
      ['-6', FALSE_VALIDATION],
      ['20', FALSE_VALIDATION],
      ['-1', FALSE_VALIDATION],
      ['13', FALSE_VALIDATION]
    ]
  };

  if (currentMonth !== 1) {
    describes['invalid month'].push([
      previousMonth.toString(),
      {
        isValid: currentMonth !== 1,
        isPotentiallyValid: true,
        isValidForThisYear: false
      }
    ]);
  }

  Object.keys(describes).forEach(function (key) {
    var tests = describes[key];

    describe(key, function () {
      tests.forEach(function (test) {
        var arg = test[0];
        var output = test[1];

        it('returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
          expect(expirationMonth(arg)).to.deep.equal(output);
        });
      });
    });
  });
});
