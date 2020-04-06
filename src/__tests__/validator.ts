import validator = require("../");

describe("validator", () => {
  it("exports all necessary functions", () => {
    expect(validator.number).toBeInstanceOf(Function);
    expect(validator.expirationDate).toBeInstanceOf(Function);
    expect(validator.expirationMonth).toBeInstanceOf(Function);
    expect(validator.expirationYear).toBeInstanceOf(Function);
    expect(validator.cvv).toBeInstanceOf(Function);
    expect(validator.postalCode).toBeInstanceOf(Function);
  });
});
