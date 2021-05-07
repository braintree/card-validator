import type { Verification } from "./types";

export interface ExpirationYearVerification extends Verification {
  isCurrentYear: boolean;
}

const DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE = 19;

function verification(
  isValid: boolean,
  isPotentiallyValid: boolean,
  isCurrentYear?: boolean
): ExpirationYearVerification {
  return {
    isValid,
    isPotentiallyValid,
    isCurrentYear: isCurrentYear || false,
  };
}

export function expirationYear(
  value: string | unknown,
  maxElapsedYear = DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE
): ExpirationYearVerification {
  let isCurrentYear;

  if (typeof value !== "string") {
    return verification(false, false);
  }
  if (value.replace(/\s/g, "") === "") {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  const len = value.length;

  if (len < 2) {
    return verification(false, true);
  }

  const currentYear = new Date().getFullYear();

  if (len === 3) {
    // 20x === 20x
    const firstTwo = value.slice(0, 2);
    const currentFirstTwo = String(currentYear).slice(0, 2);

    return verification(false, firstTwo === currentFirstTwo);
  }

  if (len > 4) {
    return verification(false, false);
  }

  const numericValue = parseInt(value, 10);
  const twoDigitYear = Number(String(currentYear).substr(2, 2));
  let valid = false;

  if (len === 2) {
    if (String(currentYear).substr(0, 2) === value) {
      return verification(false, true);
    }

    isCurrentYear = twoDigitYear === numericValue;
    valid =
      numericValue >= twoDigitYear &&
      numericValue <= twoDigitYear + maxElapsedYear;
  } else if (len === 4) {
    isCurrentYear = currentYear === numericValue;
    valid =
      numericValue >= currentYear &&
      numericValue <= currentYear + maxElapsedYear;
  }

  return verification(valid, valid, isCurrentYear);
}
