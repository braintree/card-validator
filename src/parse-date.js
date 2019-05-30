'use strict';

var expirationYear = require('./expiration-year');
var isArray = require('./lib/is-array');

function getNumberOfMonthDigitsInDateString(dateString) {
  /*
    if the first character in the string starts from `0`,
    we assume that the first two characters are a month

    '0122' => {month: '01', year: '22'}
  */
  if (dateString[0] === '0') {
    return 2;
  }

  /*
    If the length of the value is more than five characters,
    we assume that the first two characters are a month

    '112020' => {month: '11', year: '2020'}
  */
  if (dateString.length > 5) {
    return 2;
  }

  /*
    If the last value is zero then
    we assume that the last two values are ready
    and the first character is a month

    '120' => {month: '1', year: '20'}
  */
  if (dateString[dateString.length - 1] === '0') {
    return 1;
  }

  /*
    If the length of the value is less than four,
    we consider the first two values to be a month

    '122' => {month: '1', year: '22'}
  */
  if (dateString.length < 4) {
    return 2;
  }

  /*
    By default, the month value is the first value
  */
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

  len = getNumberOfMonthDigitsInDateString(value);

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
