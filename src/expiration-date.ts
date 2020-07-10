import { parseDate } from "./lib/parse-date";
import { expirationMonth } from "./expiration-month";
import { expirationYear } from "./expiration-year";

import type { Verification } from "./types";

export interface ExpirationDateVerification extends Verification {
  month: string | null;
  year: string | null;
}

function verification(
  isValid: boolean,
  isPotentiallyValid: boolean,
  month: string | null,
  year: string | null
): ExpirationDateVerification {
  return {
    isValid,
    isPotentiallyValid,
    month,
    year,
  };
}

export function expirationDate(
  value: string | Record<string, string | number> | unknown,
  maxElapsedYear?: number
): ExpirationDateVerification {
  let date;

  if (typeof value === "string") {
    value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, "$1/$2");
    date = parseDate(String(value));
  } else if (value !== null && typeof value === "object") {
    const fullDate = { ...value } as ExpirationDateVerification;
    date = {
      month: String(fullDate.month),
      year: String(fullDate.year),
    };
  } else {
    return verification(false, false, null, null);
  }

  const monthValid = expirationMonth(date.month);
  const yearValid = expirationYear(date.year, maxElapsedYear);

  if (monthValid.isValid) {
    if (yearValid.isCurrentYear) {
      const isValidForThisYear = monthValid.isValidForThisYear;

      return verification(
        isValidForThisYear,
        isValidForThisYear,
        date.month,
        date.year
      );
    }

    if (yearValid.isValid) {
      return verification(true, true, date.month, date.year);
    }
  }

  if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
    return verification(false, true, null, null);
  }

  return verification(false, false, null, null);
}
