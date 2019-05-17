'use strict';

var parseDate = require('./parse-date');
var expirationMonth = require('./expiration-month');
var expirationYear = require('./expiration-year');

function verification(isValid, isPotentiallyValid, month, year) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    month: month,
    year: year
  };
}

function expirationDate(value, maxElapsedYear) {
  var date, monthValid, yearValid, isValidForThisYear;

  if (typeof value === 'string') {
    value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2');
    date = parseDate(value);
  } else if (value !== null && typeof value === 'object') {
    date = {
      month: String(value.month),
      year: String(value.year)
    };
  } else {
    return verification(false, false, null, null);
  }

  monthValid = expirationMonth(date.month);
  yearValid = expirationYear(date.year, maxElapsedYear);

  if (monthValid.isValid) {
    if (yearValid.isCurrentYear) {
      isValidForThisYear = monthValid.isValidForThisYear;

      return verification(isValidForThisYear, isValidForThisYear, date.month, date.year);
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

module.exports = expirationDate;
