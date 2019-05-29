'use strict';

var expirationYear = require('./expiration-year');
var isArray = require('./lib/is-array');

function monthLength(value) {
  if (value[0] === '0') {
    return 2;
  }

  if (value.length > 5) {
    return 2;
  }

  if (value[value.length - 1] === '0') {
    return 1;
  }

  if (value.length < 4) {
    return 2;
  }

  return 1;
}

function parseDate(value) {
  var month, len, year, yearValid;

  if (/\//.test(value)) {
    value = value.split(/\s*\/\s*/g);
  } else if (/\s/.test(value)) {
    value = value.split(/ +/g);
  }

  if (isArray(value)) {
    return {
      month: value[0] || '',
      year: value.slice(1).join()
    };
  }

  len = monthLength(value);

  if (value[0] === '1') {
    year = value.substr(1);
    yearValid = expirationYear(year);
    if (!yearValid.isPotentiallyValid) {
      len = 2;
    }
  }

  month = value.substr(0, len);

  return {
    month: month,
    year: value.substr(month.length)
  };
}

module.exports = parseDate;
