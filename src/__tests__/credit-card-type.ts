import cardValidator = require("../");
import creditCardType = require("credit-card-type");

describe("creditCardType", () => {
  it("exposes creditCardType", () => {
    expect(cardValidator.creditCardType).toBe(creditCardType);
  });
});
