var isString = require('lodash.isstring');
var extend = require('lodash.assign');
var luhn10 = require('./luhn-10');
var getCardType = require('credit-card-type');
var isNumber = require('lodash.isnumber');

function verification(card, isPotentiallyValid, isValid) {
  return extend({}, {card: card, isPotentiallyValid: isPotentiallyValid, isValid: isValid});
}

function isEmptyObject(object) {
  var key;

  for (key in object) {
    if (object.hasOwnProperty(key)) { return false; }
  }

  return true;
}

function cardNumber(value) {
  var cardType;

  if (isNumber(value)) {
    value = String(value);
  }

  if (!isString(value)) { return verification(null, false, false); }

  if (value === '') { return verification(null, true, false); }

  value = value.replace(/\-|\s/g, '');

  if (!/^\d*$/.test(value)) { return verification(null, false, false); }

  // TODO: Just letting these go here as validPartials
  // The optimal solution would be to have a separate
  // set of regexes for partial validations

  // Discover cannot be determined until we have 4 digits
  if (value.length <= 3 && value[0] === '6') {
    return verification(null, true, false);
  }

  // Non-discover cards
  if (value.length <= 1 && /^(5|4|3)/.test(value)) { return verification(null, true, false); }

  cardType = getCardType(value);
  if (isEmptyObject(cardType)) { return verification(null, false, false); }

  // Recognized as card but not long enough yet: validPartial
  if (value.length < cardType.length) {
    return verification(cardType, true, false);
  }

  if (value.length > cardType.length) {
    return verification(cardType, false, false);
  }

  var valid = luhn10(value);
  return verification(cardType, valid, valid);
}

module.exports = cardNumber;
