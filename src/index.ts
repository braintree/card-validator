import * as creditCardType from "credit-card-type";

import { cardholderName } from "./cardholder-name";
import { cardNumber as number } from "./card-number";
import { expirationDate } from "./expiration-date";
import { expirationMonth } from "./expiration-month";
import { expirationYear } from "./expiration-year";
import { cvv } from "./cvv";
import { postalCode } from "./postal-code";

const cardValidator = {
  creditCardType,
  cardholderName,
  number,
  expirationDate,
  expirationMonth,
  expirationYear,
  cvv,
  postalCode,
};

export = cardValidator;
