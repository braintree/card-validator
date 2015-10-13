var isString = require('lodash/lang/isString');
var extend = require('lodash/object/assign');
var luhn10 = require('./luhn-10');
var getCardTypes = require('credit-card-type');
var isNumber = require('lodash/lang/isNumber');

function verification(card, isPotentiallyValid, isValid) {
  return extend({}, {card: card, isPotentiallyValid: isPotentiallyValid, isValid: isValid});
}

function cardNumber(value) {
  var potentialTypes, cardType, valid, i, maxLength;

  if (isNumber(value)) {
    value = String(value);
  }

  if (!isString(value)) { return verification(null, false, false); }

  value = value.replace(/\-|\s/g, '');

  if (!/^\d*$/.test(value)) { return verification(null, false, false); }

  potentialTypes = getCardTypes(value);

  if (potentialTypes.length === 0) {
    return verification(null, false, false);
  } else if (potentialTypes.length !== 1) {
    return verification(null, true, false);
  }

  cardType = potentialTypes[0];

  if (cardType.type === 'unionpay') {  // UnionPay is not Luhn 10 compliant
    valid = true;
  } else {
    valid = luhn10(value);
  }

  for (i = 0; i < cardType.lengths.length; i++) {
    if (cardType.lengths[i] === value.length) {
      return verification(cardType, valid, valid);
    }
  }

  maxLength = Math.max.apply(null, cardType.lengths);

  if (value.length < maxLength) {
    return verification(cardType, true, false);
  }

  return verification(cardType, false, false);
}

module.exports = cardNumber;
