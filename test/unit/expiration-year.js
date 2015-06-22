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
      [-1, {isValid: false, isPotentiallyValid: false}],
      [-12, {isValid: false, isPotentiallyValid: false}]
    ],

    'returns false for malformed strings': [
      ['foo', {isValid: false, isPotentiallyValid: false}],
      ['1.2', {isValid: false, isPotentiallyValid: false}],
      ['1/20', {isValid: false, isPotentiallyValid: false}],
      ['1 2', {isValid: false, isPotentiallyValid: false}],
      ['1 ', {isValid: false, isPotentiallyValid: false}],
      [' 1', {isValid: false, isPotentiallyValid: false}],
      ['20015', {isValid: false, isPotentiallyValid: false}]
    ],

    'returns the appropriate values for incomplete strings': [
      ['', {isValid: false, isPotentiallyValid: true}],
      ['2', {isValid: false, isPotentiallyValid: true}],
      ['9', {isValid: false, isPotentiallyValid: true}],
      ['200', {isValid: false, isPotentiallyValid: true}],
      ['123', {isValid: false, isPotentiallyValid: false}]
    ],

    'accepts four-digit years': [
      [yearsFromNow(0), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(-5), {isValid: false, isPotentiallyValid: false}],
      [yearsFromNow(5), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(10), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(11), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(12), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(19), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(20), {isValid: false, isPotentiallyValid: false}],
      [yearsFromNow(25), {isValid: false, isPotentiallyValid: false}],
      [yearsFromNow(33), {isValid: false, isPotentiallyValid: false}]
    ],

    'accepts two-digit years': [
      [yearsFromNow(0, 2), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(-5, 2), {isValid: false, isPotentiallyValid: false}],
      [yearsFromNow(5, 2), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(10, 2), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(11, 2), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(12, 2), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(19, 2), {isValid: true, isPotentiallyValid: true}],
      [yearsFromNow(20, 2), {isValid: false, isPotentiallyValid: false}],
      [yearsFromNow(25, 2), {isValid: false, isPotentiallyValid: false}],
      [yearsFromNow(33, 2), {isValid: false, isPotentiallyValid: false}]
    ],

    // This doesn't take 20xx -> 21xx into account, but probably YAGNI
    'accepts three-digit years': [
      [yearsFromNow(-3).slice(0, 3), {isValid: false, isPotentiallyValid: true}],
      [yearsFromNow(-1).slice(0, 3), {isValid: false, isPotentiallyValid: true}],
      [yearsFromNow(0).slice(0, 3), {isValid: false, isPotentiallyValid: true}],
      [yearsFromNow(1).slice(0, 3), {isValid: false, isPotentiallyValid: true}],
      [yearsFromNow(5).slice(0, 3), {isValid: false, isPotentiallyValid: true}],
      [yearsFromNow(11).slice(0, 3), {isValid: false, isPotentiallyValid: true}],
      [yearsFromNow(17).slice(0, 3), {isValid: false, isPotentiallyValid: true}],
      [yearsFromNow(23).slice(0, 3), {isValid: false, isPotentiallyValid: true}]
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
        })
      });
    });
  });
});
