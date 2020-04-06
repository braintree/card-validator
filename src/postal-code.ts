import type { Verification, PostalCodeOptions } from "./types";

const DEFAULT_MIN_POSTAL_CODE_LENGTH = 3;

function verification(isValid, isPotentiallyValid): Verification {
  return { isValid: isValid, isPotentiallyValid: isPotentiallyValid };
}

function postalCode(value, options: PostalCodeOptions = {}): Verification {
  const minLength = options.minLength || DEFAULT_MIN_POSTAL_CODE_LENGTH;

  if (typeof value !== "string") {
    return verification(false, false);
  } else if (value.length < minLength) {
    return verification(false, true);
  }

  return verification(true, true);
}

export default postalCode;
