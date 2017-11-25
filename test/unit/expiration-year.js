'use strict';

var expect = require('chai').expect;
var expirationYear = require('../../src/expiration-year');
var currentYear = new Date().getFullYear();

function yearsFromNow(fromNow, digits) {
  var result = String(currentYear + fromNow);

  if (digits === 2) {
    result = result.substr(2, 2);
  }
  return result;
}

describe('expirationYear', function () {
  var FALSE_VALIDATION = {isValid: false, isPotentiallyValid: false, isCurrentYear: false};

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
      [-1, FALSE_VALIDATION],
      [-12, FALSE_VALIDATION]
    ],

    'returns false for malformed strings': [
      ['foo', FALSE_VALIDATION],
      ['1.2', FALSE_VALIDATION],
      ['1/20', FALSE_VALIDATION],
      ['1 2', FALSE_VALIDATION],
      ['1 ', FALSE_VALIDATION],
      [' 1', FALSE_VALIDATION],
      ['20015', FALSE_VALIDATION]
    ],

    'returns the appropriate values for incomplete strings': [
      ['', {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      ['2', {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      ['9', {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      ['200', {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      ['123', {isValid: false, isPotentiallyValid: false, isCurrentYear: false}]
    ],

    'accepts four-digit years': [
      [yearsFromNow(0), {isValid: true, isPotentiallyValid: true, isCurrentYear: true}],
      [yearsFromNow(-5), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}],
      [yearsFromNow(5), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(10), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(11), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(12), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(19), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(20), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}],
      [yearsFromNow(25), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}],
      [yearsFromNow(33), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}]
    ],

    'accepts two-digit years': [
      [yearsFromNow(0, 2), {isValid: true, isPotentiallyValid: true, isCurrentYear: true}],
      [yearsFromNow(-5, 2), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}],
      [yearsFromNow(5, 2), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(10, 2), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(11, 2), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(12, 2), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(19, 2), {isValid: true, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(20, 2), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}],
      [yearsFromNow(25, 2), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}],
      [yearsFromNow(33, 2), {isValid: false, isPotentiallyValid: false, isCurrentYear: false}]
    ],

    // This doesn't take 20xx -> 21xx into account, but probably YAGNI
    'accepts three-digit years': [
      [yearsFromNow(-3).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(-1).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(0).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(1).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(5).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(11).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(17).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}],
      [yearsFromNow(23).slice(0, 3), {isValid: false, isPotentiallyValid: true, isCurrentYear: false}]
    ]
  };

  Object.keys(describes).forEach(function (key) {
    var tests = describes[key];

    describe(key, function () {
      tests.forEach(function (test) {
        var arg = test[0];
        var output = test[1];

        it('returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
          expect(expirationYear(arg)).to.deep.equal(output);
        });
      });
    });
  });

  it('defaults maxElapsedYear is 19', function () {
    expect(expirationYear(yearsFromNow(19))).to.deep.equal({isValid: true, isPotentiallyValid: true, isCurrentYear: false});
    expect(expirationYear(yearsFromNow(20))).to.deep.equal({isValid: false, isPotentiallyValid: false, isCurrentYear: false});
  });

  it('accepts maxElapsedYear', function () {
    expect(expirationYear(yearsFromNow(20), 20)).to.deep.equal({isValid: true, isPotentiallyValid: true, isCurrentYear: false});
    expect(expirationYear(yearsFromNow(21), 20)).to.deep.equal({isValid: false, isPotentiallyValid: false, isCurrentYear: false});
  });
});
