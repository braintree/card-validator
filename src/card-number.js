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
  var cardType, valid, i, maxLength;

  if (isNumber(value)) {
    value = String(value);
  }

  if (!isString(value)) { return verification(null, false, false); }

  if (value === '') { return verification(null, true, false); }

  value = value.replace(/\-|\s/g, '');

  if (!/^\d*$/.test(value)) { return verification(null, false, false); }

  cardType = getCardType(value);
  if (isEmptyObject(cardType)) { return verification(null, false, false); }

  if (cardType.type === 'unionpay') { // UnionPay is not Luhn 10 compliant
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
