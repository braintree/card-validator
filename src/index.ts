import * as creditCardTypeFunction from "credit-card-type";

import { cardholderName } from "./cardholder-name";
import { cardNumber } from "./card-number";
import { expirationDate } from "./expiration-date";
import { expirationMonth } from "./expiration-month";
import { expirationYear } from "./expiration-year";
import { cvv } from "./cvv";
import { postalCode } from "./postal-code";
import { CreditCardType } from "credit-card-type/dist/types";

const number = cardNumber;
const creditCardType: (number: string) => Array<CreditCardType> =
  creditCardTypeFunction.default;
export {
  creditCardType,
  cardholderName,
  number,
  cardNumber,
  expirationDate,
  expirationMonth,
  expirationYear,
  cvv,
  postalCode,
};
