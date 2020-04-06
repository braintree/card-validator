import parseDate from "./parse-date";
import expirationMonth from "./expiration-month";
import expirationYear from "./expiration-year";

import type { ExpirationDateVerification } from "./types";

function verification(
  isValid,
  isPotentiallyValid,
  month,
  year
): ExpirationDateVerification {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    month: month,
    year: year,
  };
}

function expirationDate(value, maxElapsedYear?): ExpirationDateVerification {
  let date;

  if (typeof value === "string") {
    value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, "$1/$2");
    date = parseDate(value);
  } else if (value !== null && typeof value === "object") {
    date = {
      month: String(value.month),
      year: String(value.year),
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

export default expirationDate;
