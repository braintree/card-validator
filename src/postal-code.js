'use strict';

var isString = require('lodash/lang/isString');
var MIN_POSTAL_CODE_LENGTH = 3;

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function postalCode(value) {
  if (!isString(value)) {
    return verification(false, false);
  } else if (value.length < MIN_POSTAL_CODE_LENGTH) {
    return verification(false, true);
  }

  return verification(true, true);
}

module.exports = postalCode;
