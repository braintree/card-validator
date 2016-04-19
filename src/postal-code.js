'use strict';

var isString = require('lodash/lang/isString');

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function postalCode(value) {
  if (!isString(value)) {
    return verification(false, false);
  } else if (value.length < 4) {
    return verification(false, true);
  }

  return verification(true, true);
}

module.exports = postalCode;
