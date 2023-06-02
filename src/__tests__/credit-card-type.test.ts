import cardValidator from "../";
import * as creditCardType from "credit-card-type";

describe("creditCardType", () => {
  it("exposes creditCardType", () => {
    expect(cardValidator.creditCardType).toBe(creditCardType);
  });
});
