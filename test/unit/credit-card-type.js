'use strict';

var expect = require('chai').expect;
var cardValidator = require('../../');
var creditCardType = require('credit-card-type');

describe('creditCardType', function () {
  it('exposes creditCardType', function () {
    expect(cardValidator.creditCardType).to.equal(creditCardType);
  });
});
