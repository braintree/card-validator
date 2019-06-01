'use strict';

var expirationYear = require('./expiration-year');
var isArray = require('./lib/is-array');

function getNumberOfMonthDigitsInDateString(dateString) {
  var firstCharacter = Number(dateString[0]);
  var assumedYear;

  /*
    if the first character in the string starts with `0`,
    we know that the month will be 2 digits.

    '0122' => {month: '01', year: '22'}
  */
  if (firstCharacter === 0) {
    return 2;
  }

  /*
    if the first character in the string starts with
    number greater than 1, it must be a 1 digit month

    '322' => {month: '3', year: '22'}
  */
  if (firstCharacter > 1) {
    return 1;
  }

  /*
    if the first 2 characters make up a number between
    13-19, we know that the month portion must be 1

    '139' => {month: '1', year: '39'}
  */
  if (firstCharacter === 1 && Number(dateString[1]) > 2) {
    return 1;
  }

  /*
    if the first 2 characters make up a number between
    10-12, we check if the year portion would be considered
    valid if we assumed that the month was 1. If it is
    not potentially valid, we assume the month must have
    2 digits.

    '109' => {month: '10', year: '9'}
    '120' => {month: '1', year: '20'} // when checked in the year 2019
    '120' => {month: '12', year: '0'} // when checked in the year 2021
  */
  if (firstCharacter === 1) {
    assumedYear = dateString.substr(1);

    return expirationYear(assumedYear).isPotentiallyValid ? 1 : 2;
  }

  /*
    If the length of the value is exactly 5 characters,
    we assume a full year was passed in, meaning the remaining
    single leading digit must be the month value.

    '12202' => {month: '1', year: '2202'}
  */
  if (dateString.length === 5) {
    return 1;
  }

  /*
    If the length of the value is more than five characters,
    we assume a full year was passed in addition to the month
    and therefore the month portion must be 2 digits.

    '112020' => {month: '11', year: '2020'}
  */
  if (dateString.length > 5) {
    return 2;
  }

  /*
    By default, the month value is the first value
  */
  return 1;
}

function parseDate(date) {
  var month, numberOfDigitsInMonth;

  if (/^\d{4}-\d{1,2}$/.test(date)) {
    date = date.split('-').reverse();
  } else if (/\//.test(date)) {
    date = date.split(/\s*\/\s*/g);
  } else if (/\s/.test(date)) {
    date = date.split(/ +/g);
  }

  if (isArray(date)) {
    return {
      month: date[0] || '',
      year: date.slice(1).join()
    };
  }

  numberOfDigitsInMonth = getNumberOfMonthDigitsInDateString(date);

  month = date.substr(0, numberOfDigitsInMonth);

  return {
    month: month,
    year: date.substr(month.length)
  };
}

module.exports = parseDate;
