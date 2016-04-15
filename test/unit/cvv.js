'use strict';

var expect = require('chai').expect;
var cvv = require('../../src/cvv');

describe('cvv', function () {
  describe('values', function () {
    var describes = {
      potentiallyValid: [
        ['', {isValid: false, isPotentiallyValid: true}],
        ['1', {isValid: false, isPotentiallyValid: true}],
        ['1', {isValid: false, isPotentiallyValid: true}, [3, 4]],
        ['1', {isValid: false, isPotentiallyValid: true}, [4, 3]],
        ['12', {isValid: false, isPotentiallyValid: true}],
        ['123', {isValid: false, isPotentiallyValid: true}, 4]
      ],

      'returns true for valid strings': [
        ['000', {isValid: true, isPotentiallyValid: true}],
        ['0000', {isValid: true, isPotentiallyValid: true}, 4],
        ['123', {isValid: true, isPotentiallyValid: true}],
        ['1234', {isValid: true, isPotentiallyValid: true}, 4],
        ['1234', {isValid: true, isPotentiallyValid: true}, [3, 4]],
        ['123', {isValid: true, isPotentiallyValid: true}, [3, 4]]
      ],

      'returns false for invalid strings': [
        ['12345', {isValid: false, isPotentiallyValid: false}],
        ['12345', {isValid: false, isPotentiallyValid: false}, [3, 4]],
        ['1234', {isValid: false, isPotentiallyValid: false}],
        ['1234', {isValid: false, isPotentiallyValid: false}, 3],
        ['foo', {isValid: false, isPotentiallyValid: false}],
        ['-123', {isValid: false, isPotentiallyValid: false}],
        ['12 34', {isValid: false, isPotentiallyValid: false}],
        ['12/34', {isValid: false, isPotentiallyValid: false}],
        ['Infinity', {isValid: false, isPotentiallyValid: false}]
      ],

      'returns false for non-string types': [
        [0, {isValid: false, isPotentiallyValid: false}],
        [123, {isValid: false, isPotentiallyValid: false}],
        [1234, {isValid: false, isPotentiallyValid: false}],
        [-1234, {isValid: false, isPotentiallyValid: false}],
        [-10, {isValid: false, isPotentiallyValid: false}],
        [0 / 0, {isValid: false, isPotentiallyValid: false}],
        [Infinity, {isValid: false, isPotentiallyValid: false}],
        [null, {isValid: false, isPotentiallyValid: false}],
        [[], {isValid: false, isPotentiallyValid: false}],
        [{}, {isValid: false, isPotentiallyValid: false}]
      ]
    };

    Object.keys(describes).forEach(function (key) {
      var tests = describes[key];

      describe(key, function () {
        tests.forEach(function (test) {
          var arg = test[0];
          var maxLength = test[2] || 3;
          var output = test[1];

          it('returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
            expect(cvv(arg, maxLength)).to.deep.equal(output);
          });
        });
      });
    });
  });

  describe('maxLength', function () {
    it('defaults maxLength to 3', function () {
      expect(cvv('1234')).to.deep.equal({isValid: false, isPotentiallyValid: false});
      expect(cvv('123')).to.deep.equal({isValid: true, isPotentiallyValid: true});
    });

    it('accepts maxLength', function () {
      expect(cvv('1234', 4)).to.deep.equal({isValid: true, isPotentiallyValid: true});
    });

    it('returns invalid if beyond maxLength', function () {
      expect(cvv('1234')).to.deep.equal({isValid: false, isPotentiallyValid: false});
      expect(cvv('12345', 4)).to.deep.equal({isValid: false, isPotentiallyValid: false});
    });
  });
});
