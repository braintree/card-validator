import type { Verification } from "./types";

const CARD_NUMBER_REGEX = /^[\d\s-]*$/;
const DEFAULT_LENGTH = 24;

function verification(
  isValid: boolean,
  isPotentiallyValid: boolean,
): Verification {
  return { isValid, isPotentiallyValid };
}

export function cardholderName(
  value: string | unknown,
  maxLength: number = DEFAULT_LENGTH,
): Verification {
  if (typeof value !== "string") {
    return verification(false, false);
  }

  if (value.length === 0) {
    return verification(false, true);
  }

  if (value.length > maxLength) {
    return verification(false, false);
  }

  // If the cardholder name only contains numbers, hyphens, and spaces, it's not valid,
  // but it may still be potentially valid if a non-numeric character is added.
  if (CARD_NUMBER_REGEX.test(value)) {
    return verification(false, true);
  }

  return verification(true, true);
}
