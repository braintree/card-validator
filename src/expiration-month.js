var isString = require('lodash.isstring');

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function expirationMonth(value) {
  var month, result;

  if (!isString(value)) {
    return verification(false, false);
  }
  if ((value.replace(/\s/g, '') === '') || (value === '0')) {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  month = parseInt(value, 10);

  if (isNaN(value)) {
    return verification(false, false);
  }

  result = month > 0 && month < 13;

  return verification(result, result);
}

module.exports = expirationMonth;
