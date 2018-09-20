'use strict';

var expect = require('chai').expect;
var cardNumber = require('../../src/card-number');

describe('number validates', function () {
  describe('partial validation sequences', function () {
    table([
      ['',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['6',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['60',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['601',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['6011',
        {card: 'discover', isPotentiallyValid: true, isValid: false}],
      ['4',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['41',
        {card: 'visa', isPotentiallyValid: true, isValid: false}],
      ['411',
        {card: 'visa', isPotentiallyValid: true, isValid: false}],
      ['',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['x',
        {card: null, isPotentiallyValid: false, isValid: false}],
      ['123',
        {card: null, isPotentiallyValid: false, isValid: false}]
    ]);
  });

  describe('normal cases', function () {
    table([
      ['4012888888881881',
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['6288997715452584',
        {card: 'unionpay', isPotentiallyValid: true, isValid: true}],
      ['6282001509099283',
        {card: 'unionpay', isPotentiallyValid: true, isValid: true}],
      ['6269992058134322',
        {card: 'unionpay', isPotentiallyValid: true, isValid: true}],
      ['6240008631401148',
        {card: 'unionpay', isPotentiallyValid: true, isValid: true}],
      ['6221558812340000', // UnionPay is not always Luhn10 valid
        {card: 'unionpay', isPotentiallyValid: true, isValid: true}],
      ['4111111111111111',
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['4111111111111111',
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['6011000990139424',
        {card: 'discover', isPotentiallyValid: true, isValid: true}],
      ['411111y',
        {card: null, isPotentiallyValid: false, isValid: false}],
      ['41111111111111111111', // Too long
        {card: 'visa', isPotentiallyValid: false, isValid: false}],
      ['4111111111111112', // right length, not Luhn, potentialls valid because visas can be 19 digits
        {card: 'visa', isPotentiallyValid: true, isValid: false}]
    ]);
  });

  describe('weird formatting', function () {
    table([
      ['4111-1111-1111-1111',
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['4111 1111 1111 1111',
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      ['601 1 1 1  1 1 1 1   1 1 1 1 1 7',
        {card: 'discover', isPotentiallyValid: true, isValid: true}]
    ]);
  });

  describe('Discover', function () {
    table([
      ['6011111',
        {card: 'discover', isPotentiallyValid: true, isValid: false}],
      ['6011111111111117',
        {card: 'discover', isPotentiallyValid: true, isValid: true}]
    ]);
  });

  describe('MasterCard', function () {
    table([
      ['2',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['27',
        {card: 'mastercard', isPotentiallyValid: true, isValid: false}],
      ['272',
        {card: 'mastercard', isPotentiallyValid: true, isValid: false}],
      ['2720',
        {card: 'mastercard', isPotentiallyValid: true, isValid: false}],
      ['55555555',
        {card: 'mastercard', isPotentiallyValid: true, isValid: false}],
      ['5555555555554444',
        {card: 'mastercard', isPotentiallyValid: true, isValid: true}],
      ['5555555555554446',
        {card: 'mastercard', isPotentiallyValid: false, isValid: false}]
    ]);
  });

  describe('Maestro', function () {
    table([
      ['602011', {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['500000000000', {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['500000000000061', {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['5000000000000611', {card: 'maestro', isPotentiallyValid: true, isValid: true}],
      ['5000000000000612', {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['500000000000000005', {card: 'maestro', isPotentiallyValid: true, isValid: false}],
      ['5000000000000000005', {card: 'maestro', isPotentiallyValid: true, isValid: true}],
      ['5000000000000000001', {card: 'maestro', isPotentiallyValid: false, isValid: false}],
      ['50000000000000000009', {card: 'maestro', isPotentiallyValid: false, isValid: false}]
    ]);
  });

  describe('Amex', function () {
    table([
      ['3782',
        {card: 'american-express', isPotentiallyValid: true, isValid: false}],
      ['378282246310005',
        {card: 'american-express', isPotentiallyValid: true, isValid: true}]
    ]);
  });

  describe('JCB', function () {
    table([
      ['1',
        {card: 'jcb', isPotentiallyValid: true, isValid: false}],
      ['21',
        {card: 'jcb', isPotentiallyValid: true, isValid: false}],
      ['3530111',
        {card: 'jcb', isPotentiallyValid: true, isValid: false}],
      ['3530111333300000',
        {card: 'jcb', isPotentiallyValid: true, isValid: true}]
    ]);
  });

  describe('UnionPay', function () {
    table([
      ['6',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['62',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['623456',
        {card: 'unionpay', isPotentiallyValid: true, isValid: false}],
      ['6212345678901232',
        {card: 'unionpay', isPotentiallyValid: true, isValid: true}]
    ]);

    context('where card number is luhn invalid', function () {
      var number = '6212345000000001';

      it('marks card valid by default', function () {
        var actual = cardNumber(number);

        expect(actual.card.type).to.equal('unionpay');
        expect(actual.isPotentiallyValid).to.equal(true);
        expect(actual.isValid).to.equal(true);
      });

      it('marks card invalid when "luhnValidateUnionPay" is present', function () {
        var options = {
          luhnValidateUnionPay: true
        };

        var actual = cardNumber(number, options);

        expect(actual.card.type).to.equal('unionpay');
        expect(actual.isPotentiallyValid).to.equal(true);
        expect(actual.isValid).to.equal(false);
      });
    });
  });

  describe('edge cases', function () {
    table([
      ['',
        {card: null, isPotentiallyValid: true, isValid: false}],
      ['foo',
        {card: null, isPotentiallyValid: false, isValid: false}],
      [{},
        {card: null, isPotentiallyValid: false, isValid: false}],
      [[],
        {card: null, isPotentiallyValid: false, isValid: false}],
      ['32908234',
        {card: null, isPotentiallyValid: false, isValid: false}],
      [32908234,
        {card: null, isPotentiallyValid: false, isValid: false}],
      [4111111111111111,
        {card: 'visa', isPotentiallyValid: true, isValid: true}],
      [true,
        {card: null, isPotentiallyValid: false, isValid: false}],
      [false,
        {card: null, isPotentiallyValid: false, isValid: false}]
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
    it('valid: is ' + expected.isValid + ' for ' + number, function () {
      expect(actual.isValid).to.equal(expected.isValid);
    });
  });
}
