'use strict';

var DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE = 19;

function verification(isValid, isPotentiallyValid, isCurrentYear) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isCurrentYear: isCurrentYear || false
  };
}

function expirationYear(value, maxElapsedYear) {
  var currentFirstTwo, currentYear, firstTwo, len, twoDigitYear, valid, isCurrentYear;

  maxElapsedYear = maxElapsedYear || DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE;

  if (typeof value !== 'string') {
    return verification(false, false);
  }
  if (value.replace(/\s/g, '') === '') {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  len = value.length;

  if (len < 2) {
    return verification(false, true);
  }

  currentYear = new Date().getFullYear();

  if (len === 3) {
    // 20x === 20x
    firstTwo = value.slice(0, 2);
    currentFirstTwo = String(currentYear).slice(0, 2);

    return verification(false, firstTwo === currentFirstTwo);
  }

  if (len > 4) {
    return verification(false, false);
  }

  value = parseInt(value, 10);
  twoDigitYear = Number(String(currentYear).substr(2, 2));

  if (len === 2) {
    isCurrentYear = twoDigitYear === value;
    valid = value >= twoDigitYear && value <= twoDigitYear + maxElapsedYear;
  } else if (len === 4) {
    isCurrentYear = currentYear === value;
    valid = value >= currentYear && value <= currentYear + maxElapsedYear;
  }

  return verification(valid, valid, isCurrentYear);
}

module.exports = expirationYear;
