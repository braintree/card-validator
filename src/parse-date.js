var expirationYear = require('./expiration-year');

function parseDate(value) {
  var month, len, year, yearValid;

  if (value.match('/')) {
    value = value.split(/\s*\/\s*/g);

    return {
      month: value[0],
      year: value.slice(1).join()
    };
  }

  len = value[0] === '0' || value.length > 5 || value.length === 4 ? 2 : 1;

  if (value.length === 3 && value[0] === '1') {
    year = value.substr(1, 2);
    yearValid = expirationYear(year);
    if (!yearValid.isValid) {
      len = 2;
    }
  }

  month = value.substr(0, len);

  return {
    month: month,
    year: value.substr(month.length, 4)
  };
}

module.exports = parseDate;
