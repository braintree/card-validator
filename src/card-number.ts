import luhn10 = require("./luhn-10");
import getCardTypes = require("credit-card-type");
import type { CardNumberOptions, CardNumberVerification } from "./types";

function verification(
  card,
  isPotentiallyValid,
  isValid
): CardNumberVerification {
  return {
    card: card,
    isPotentiallyValid: isPotentiallyValid,
    isValid: isValid,
  };
}

function cardNumber(
  value,
  options: CardNumberOptions = {}
): CardNumberVerification {
  let isPotentiallyValid, isValid, maxLength;

  if (typeof value === "number") {
    value = String(value);
  }

  if (typeof value !== "string") {
    return verification(null, false, false);
  }

  value = value.replace(/\-|\s/g, "");

  if (!/^\d*$/.test(value)) {
    return verification(null, false, false);
  }

  const potentialTypes = getCardTypes(value);

  if (potentialTypes.length === 0) {
    return verification(null, false, false);
  } else if (potentialTypes.length !== 1) {
    return verification(null, true, false);
  }

  const cardType = potentialTypes[0];

  if (options.maxLength && value.length > options.maxLength) {
    return verification(cardType, false, false);
  }

  if (
    cardType.type === getCardTypes.types.UNIONPAY &&
    options.luhnValidateUnionPay !== true
  ) {
    isValid = true;
  } else {
    isValid = luhn10(value);
  }

  maxLength = Math.max.apply(null, cardType.lengths);
  if (options.maxLength) {
    maxLength = Math.min(options.maxLength, maxLength);
  }

  for (let i = 0; i < cardType.lengths.length; i++) {
    if (cardType.lengths[i] === value.length) {
      isPotentiallyValid = value.length < maxLength || isValid;

      return verification(cardType, isPotentiallyValid, isValid);
    }
  }

  return verification(cardType, value.length < maxLength, false);
}

export default cardNumber;
