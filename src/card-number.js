'use strict';

var luhn10 = require('./luhn-10');
var getCardTypes = require('credit-card-type');

function verification(card, isPotentiallyValid, isValid) {
  return {card: card, isPotentiallyValid: isPotentiallyValid, isValid: isValid};
}

function cardNumber(value, options) {
  var potentialTypes, cardType, isPotentiallyValid, isValid, i, maxLength;

  options = options || {};

  if (typeof value === 'number') {
    value = String(value);
  }

  if (typeof value !== 'string') { return verification(null, false, false); }

  value = value.replace(/\-|\s/g, '');

  if (!/^\d*$/.test(value)) { return verification(null, false, false); }

  potentialTypes = getCardTypes(value);

  if (potentialTypes.length === 0) {
    return verification(null, false, false);
  } else if (potentialTypes.length !== 1) {
    return verification(null, true, false);
  }

  cardType = potentialTypes[0];

  if (options.maxLength && value.length > options.maxLength) {
    return verification(cardType, false, false);
  }

  if (cardType.type === getCardTypes.types.UNIONPAY && options.luhnValidateUnionPay !== true) {
    isValid = true;
  } else {
    isValid = luhn10(value);
  }

  maxLength = Math.max.apply(null, cardType.lengths);
  if (options.maxLength) {
    maxLength = Math.min(options.maxLength, maxLength);
  }

  for (i = 0; i < cardType.lengths.length; i++) {
    if (cardType.lengths[i] === value.length) {
      isPotentiallyValid = value.length < maxLength || isValid;

      return verification(cardType, isPotentiallyValid, isValid);
    }
  }

  return verification(cardType, value.length < maxLength, false);
}

module.exports = cardNumber;
