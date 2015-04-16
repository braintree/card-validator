var isString = require('lodash.isstring');
var DEFAULT_LENGTH = 3;

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function cvv(value, maxLength) {
  maxLength = maxLength || DEFAULT_LENGTH;

  if (!isString(value)) { return verification(false, false); }
  if (!/^\d*$/.test(value)) { return verification(false, false); }
  if (value.length === maxLength) { return verification(true, true); }
  if (value.length < maxLength) { return verification(false, true); }
  if (value.length > maxLength) { return verification(false, false); }

  return verification(true, true);
}

module.exports = cvv;
