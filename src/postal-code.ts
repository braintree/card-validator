import type { Verification } from "./types";

type PostalCodeOptions = {
  minLength?: number;
};

const DEFAULT_MIN_POSTAL_CODE_LENGTH = 3;
const ALPHANUM = new RegExp(/^[a-z0-9]+$/i);

function verification(
  isValid: boolean,
  isPotentiallyValid: boolean,
): Verification {
  return { isValid, isPotentiallyValid };
}

export function postalCode(
  value: string | unknown,
  options: PostalCodeOptions = {},
): Verification {
  const minLength = options.minLength || DEFAULT_MIN_POSTAL_CODE_LENGTH;

  if (typeof value !== "string") {
    return verification(false, false);
  } else if (value.length < minLength) {
    return verification(false, true);
  } else if (!ALPHANUM.test(value.trim().slice(0, minLength))) {
    return verification(false, true);
  }

  return verification(true, true);
}
