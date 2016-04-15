'use strict';

var expect = require('chai').expect;
var validator = require('../../index');

describe('validator', function () {
  it('exports all necessary functions', function () {
    expect(validator.number).to.be.a('function');
    expect(validator.expirationDate).to.be.a('function');
    expect(validator.expirationMonth).to.be.a('function');
    expect(validator.expirationYear).to.be.a('function');
    expect(validator.cvv).to.be.a('function');
    expect(validator.postalCode).to.be.a('function');
  });
});
