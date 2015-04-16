var expect = require('chai').expect;
var postalCode = require('../../src/postal-code');

describe('postalCode', function () {
  var describes = {
    'returns false for non-string types': [
      [0, {isValid: false, isPotentiallyValid: false}],
      [0, {isValid: false, isPotentiallyValid: false}],
      [123, {isValid: false, isPotentiallyValid: false}],
      [1234, {isValid: false, isPotentiallyValid: false}],
      [12345, {isValid: false, isPotentiallyValid: false}],
      [557016, {isValid: false, isPotentiallyValid: false}],
      [-1234, {isValid: false, isPotentiallyValid: false}],
      [-10, {isValid: false, isPotentiallyValid: false}],
      [0 / 0, {isValid: false, isPotentiallyValid: false}],
      [Infinity, {isValid: false, isPotentiallyValid: false}],
      [null, {isValid: false, isPotentiallyValid: false}],
      [[], {isValid: false, isPotentiallyValid: false}],
      [{}, {isValid: false, isPotentiallyValid: false}]
    ],

    'accepts valid postal codes': [
      ['1234', {isValid: true, isPotentiallyValid: true}],
      ['12345', {isValid: true, isPotentiallyValid: true}],
      ['12345', {isValid: true, isPotentiallyValid: true}],
      ['557016', {isValid: true, isPotentiallyValid: true}], // Romania
      ['110001', {isValid: true, isPotentiallyValid: true}], // India
      ['SE1 2LN', {isValid: true, isPotentiallyValid: true}], // UK
      ['01234567890123456789', {isValid: true, isPotentiallyValid: true}] // some hypothetical country
    ],

    'doesn\'t reject non-numeric strings': [
      ['hello world', {isValid: true, isPotentiallyValid: true}]
    ],

    'returns isPotentiallyValid for shorter-than-4 strings': [
      ['', {isValid: false, isPotentiallyValid: true}],
      ['1', {isValid: false, isPotentiallyValid: true}],
      ['12', {isValid: false, isPotentiallyValid: true}],
      ['123', {isValid: false, isPotentiallyValid: true}]
    ]
  };

  Object.keys(describes).forEach(function (key) {
    var tests = describes[key];
    describe(key, function () {
      tests.forEach(function (test) {
        var arg = test[0];
        var output = test[1];

        it('returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
          expect(postalCode(arg)).to.deep.equal(output);
        })
      });
    });
  });

});
