import luhn10 = require("./luhn-10");
import getCardTypes = require("credit-card-type");
import type { Verification } from "./types";

// TODO this should probably come from credit-card-type
type CreditCardType = {
  niceType: string;
  type: string;
  patterns: Array<number[] | number>;
  gaps: number[];
  lengths: number[];
  code: {
    name: string;
    size: number;
  };
};

export interface CardNumberVerification extends Verification {
  card: CreditCardType | null;
}

type CardNumberOptions = {
  maxLength?: number;
  luhnValidateUnionPay?: boolean;
};

function verification(
  card: CreditCardType | null,
  isPotentiallyValid: boolean,
  isValid: boolean
): CardNumberVerification {
  return {
    card,
    isPotentiallyValid,
    isValid,
  };
}

export function cardNumber(
  value: string | unknown,
  options: CardNumberOptions = {}
): CardNumberVerification {
  let isPotentiallyValid, isValid, maxLength;

  if (typeof value !== "string" && typeof value !== "number") {
    return verification(null, false, false);
  }

  const testCardValue = String(value).replace(/-|\s/g, "");

  if (!/^\d*$/.test(testCardValue)) {
    return verification(null, false, false);
  }

  const potentialTypes = getCardTypes(testCardValue);

  if (potentialTypes.length === 0) {
    return verification(null, false, false);
  } else if (potentialTypes.length !== 1) {
    return verification(null, true, false);
  }

  const cardType = potentialTypes[0];

  if (options.maxLength && testCardValue.length > options.maxLength) {
    return verification(cardType, false, false);
  }

  if (
    cardType.type === getCardTypes.types.UNIONPAY &&
    options.luhnValidateUnionPay !== true
  ) {
    isValid = true;
  } else {
    isValid = luhn10(testCardValue);
  }

  maxLength = Math.max.apply(null, cardType.lengths);
  if (options.maxLength) {
    maxLength = Math.min(options.maxLength, maxLength);
  }

  for (let i = 0; i < cardType.lengths.length; i++) {
    if (cardType.lengths[i] === testCardValue.length) {
      isPotentiallyValid = testCardValue.length < maxLength || isValid;

      return verification(cardType, isPotentiallyValid, isValid);
    }
  }

  return verification(cardType, testCardValue.length < maxLength, false);
}
