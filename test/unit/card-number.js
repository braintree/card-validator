var expect = require('chai').expect;
var cardNumber = require('../../src/card-number');

describe('number validates', function () {

  describe('partial validation sequences', function () {
    table([
      ['',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['6',
        {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['60',
        {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['601',
        {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['6011',
        {card: 'discover', isPotentiallyValid: true, isValid: false}],
      ['4',
        {card: 'visa', isPotentiallyValid: true, isValid: false}],
      ['41',
        {card: 'visa', isPotentiallyValid: true, isValid: false}],
      ['411',
        {card: 'visa', isPotentiallyValid: true, isValid: false}],
      ['',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['x',
        {card: null, isPotentiallyValid: false, isValid: false}]
    ]);
  });

  describe('normal cases', function () {
    table([
      ['123',
        {card: null, isPotentiallyValid: false, isValid: false}],
      ['4012888888881881', // Valid Visa
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['4111111111111111', // Valid Visa
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['6011000990139424', // Valid Discover
        {card: 'discover', isPotentiallyValid: true, isValid: true}],
      ['411111y',
        {card: null, isPotentiallyValid: false, isValid: false}],
      ['41111111111111111111', // Too long
        {card: 'visa', isPotentiallyValid: false, isValid: false}],
      ['1111111111111111', // Right length but not luhn
        {card: null, isPotentiallyValid: false, isValid: false}],
      ['4111111111111112', // Visa but no luhn
        {card: 'visa', isPotentiallyValid: false, isValid: false}],
    ]);
  });

  describe('weird formatting', function () {
    table([
      ['4111-1111-1111-1111',
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['4111 1111 1111 1111',
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['601 1 1 1  1 1 1 1   1 1 1 1 1 7',
        {card: 'discover', isPotentiallyValid: true, isValid: true}],
    ]);
  });

  describe('Discover', function () {
    table([
      ['6011111',
        {card: 'discover', isPotentiallyValid: true, isValid: false}],
      ['6011111111111117',
        {card: 'discover', isPotentiallyValid: true, isValid: true}],
    ]);
  });

  describe('Mastercard', function () {
    table([
      ['55555555',
        {card: 'master-card', isPotentiallyValid: true, isValid: false}],
      ['5555555555554444',
        {card: 'master-card', isPotentiallyValid: true, isValid: true}],
      ['5555555555554446',
        {card: 'master-card', isPotentiallyValid: false, isValid: false}],
    ]);
  });

  describe('Amex', function () {
    table([
      ['3782',
        {card: 'american-express', isPotentiallyValid: true, isValid: false}],
      ['378282246310005',
        {card: 'american-express', isPotentiallyValid: true, isValid: true}],
    ]);
  });

  describe('JCB', function () {
    table([
      ['3530111',
        {card: 'jcb', isPotentiallyValid: true, isValid: false}],
      ['3530111333300000',
        {card: 'jcb', isPotentiallyValid: true, isValid: true}],
    ]);
  });

  describe('edge cases', function () {
    table([
      ['',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['1',
        {card: null, isPotentiallyValid: false, isValid: false}],
      ['foo',
        {card: null, isPotentiallyValid: false, isValid: false}],
      [{},
        {card: null, isPotentiallyValid: false, isValid: false}],
      [[],
        {card: null, isPotentiallyValid: false, isValid: false}],
      [32908234,
        {card: null, isPotentiallyValid: false, isValid: false}],
      [4111111111111111,
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      [true,
        {card: null, isPotentiallyValid: false, isValid: false}],
      [false,
        {card: null, isPotentiallyValid: false, isValid: false}],
    ]);
  });

});

function table(tests) {
  tests.forEach(function (test) {
    var number = test[0];
    var expected = test[1];
    var actual = cardNumber(number);

    it('card: is ' + expected.card + ' for ' + number, function () {
      if (expected.card) {
        expect(actual.card.type).to.equal(expected.card);
      } else {
        expect(actual.card).to.equal(null);
      }
    });
    it('isPotentiallyValid: is ' + expected.isPotentiallyValid + ' for ' + number, function () {
      expect(actual.isPotentiallyValid).to.equal(expected.isPotentiallyValid);
    });
    it('valid: is ' + expected.valid + ' for ' + number, function () {
      expect(actual.valid).to.equal(expected.valid);
    });
  });
}
