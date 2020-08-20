import type { Verification } from "./types";

const CARD_NUMBER_REGEX = /^[\d\s-]*$/;
const MAX_LENGTH = 255;

function verification(
  isValid: boolean,
  isPotentiallyValid: boolean
): Verification {
  return { isValid, isPotentiallyValid };
}

export function cardholderName(value: string | unknown): Verification {
  if (typeof value !== "string") {
    return verification(false, false);
  }

  if (value.length === 0) {
    return verification(false, true);
  }

  if (value.length > MAX_LENGTH) {
    return verification(false, false);
  }

  if (CARD_NUMBER_REGEX.test(value)) {
    return verification(false, true);
  }

  return verification(true, true);
}
