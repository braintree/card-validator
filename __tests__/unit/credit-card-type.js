var cardValidator = require('../../');
var creditCardType = require('credit-card-type');

describe('creditCardType', function () {
  it('exposes creditCardType', function () {
    expect(cardValidator.creditCardType).toBe(creditCardType);
  });
});
