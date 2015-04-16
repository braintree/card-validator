var parseDate = require('./parse-date');
var expirationMonth = require('./expiration-month');
var expirationYear = require('./expiration-year');
var isString = require('lodash.isstring');

function verification(isValid, isPotentiallyValid, month, year) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    month: month,
    year: year
  };
}

function expirationDate(value) {
  var date, monthValid, yearValid;

  if (!isString(value)) {
    return verification(false, false, null, null);
  }

  value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2');
  date = parseDate(value);
  monthValid = expirationMonth(date.month);
  yearValid = expirationYear(date.year);

  if (monthValid.isValid && yearValid.isValid) {
    return verification(true, true, date.month, date.year);
  }

  if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
    return verification(false, true, null, null);
  }

  return verification(false, false, null, null);
}

module.exports = expirationDate;
