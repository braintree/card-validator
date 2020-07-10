import type { Verification } from "./types";

export interface ExpirationMonthVerification extends Verification {
  isValidForThisYear: boolean;
}

function verification(
  isValid: boolean,
  isPotentiallyValid: boolean,
  isValidForThisYear?: boolean
): ExpirationMonthVerification {
  return {
    isValid,
    isPotentiallyValid,
    isValidForThisYear: isValidForThisYear || false,
  };
}

export function expirationMonth(
  value: string | unknown
): ExpirationMonthVerification {
  const currentMonth = new Date().getMonth() + 1;

  if (typeof value !== "string") {
    return verification(false, false);
  }
  if (value.replace(/\s/g, "") === "" || value === "0") {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  const month = parseInt(value, 10);

  if (isNaN(Number(value))) {
    return verification(false, false);
  }

  const result = month > 0 && month < 13;

  return verification(result, result, result && month >= currentMonth);
}
