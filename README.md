# Credit Card Validator [![Build Status](https://github.com/braintree/card-validator/workflows/Unit%20Tests/badge.svg)](https://github.com/braintree/card-validator/actions?query=workflow%3A%22Unit+Tests%22) [![npm version](https://badge.fury.io/js/card-validator.svg)](http://badge.fury.io/js/card-validator)

Credit Card Validator provides validation utilities for credit card data inputs. It is designed as a CommonJS module for use in Node.js, io.js, or the [browser](http://browserify.org/). It includes first class support for 'potential' validity so you can use it to present appropriate UI to your user as they type.

A typical use case in a credit card form is to notify the user if the data they are entering is invalid. In a credit card field, entering “411” is not necessarily valid for submission, but it is still potentially valid. Conversely, if a user enters “41x” that value can no longer pass strict validation and you can provide a response immediately.

Credit Card Validator will also provide a determined card type (using [credit-card-type](https://github.com/braintree/credit-card-type)). This is useful for scenarios in which you wish to render an accompanying payment method icon (Visa, MasterCard, etc.). Additionally, by having access to the current card type, you can better manage the state of your credit card form as a whole. For example, if you detect a user is entering (or has entered) an American Express card number, you can update the `maxlength` attribute of your `CVV` input element from 3 to 4 and even update the corresponding `label` from 'CVV' to 'CID'.

## Download

You can install `card-validator` through `npm`.

```
npm install card-validator
```

## Example

### Using a CommonJS build tool (browserify, webpack, etc)

```javascript
var valid = require("card-validator");

var numberValidation = valid.number("4111");

if (!numberValidation.isPotentiallyValid) {
  renderInvalidCardNumber();
}

if (numberValidation.card) {
  console.log(numberValidation.card.type); // 'visa'
}
```

## API

### `var valid = require('card-validator');`

---

#### `valid.number(value: string, [options: object]): object`

```javascript
{
  card: {
    niceType: 'American Express',
    type: 'american-express',
    gaps: [4, 10],
    lengths: [15],
    code: {name: 'CID', size: 4}
  },
  isPotentiallyValid: true, // if false, indicates there is no way the card could be valid
  isValid: true // if true, number is valid for submission
}
```

You can optionally pass `luhnValidateUnionPay` as a property of an object as a second argument. This will override the default behavior to ignore luhn validity of UnionPay cards.

```javascript
valid.number(<Luhn Invalid UnionPay Card Number>, {luhnValidateUnionPay: true});

{
  card: {
    niceType: 'UnionPay',
    type: 'unionpay',
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    code: {name: 'CVN', size: 3}
  },
  isPotentiallyValid: true,
  isValid: false // Would be true if no options were included
}
```

You can optionally pass `maxLength` as a property of an object as a second argument. This will override the default behavior to use the card type's max length property and mark any cards that exceed the max length as invalid.

If a card brand has a normal max length that is shorter than the passed in max length, the validator will use the shorter one. For instance, if a `maxLength` of `16` is provided, the validator will still use `15` as the max length for American Express cards.

```javascript
valid.number(<Maestro Card with 19 Digits>, {maxLength: 16});

{
  card: {
    // Maestro card data
  },
  isPotentiallyValid: false,
  isValid: false
}
```

If a valid card type cannot be determined, the `card` field in the response will be `null`.

A fake session where a user is entering a card number may look like:

<table>
  <thead>
    <tr>
      <th colspan=1>Input</th>
      <th colspan=3>Output</th>
      <th colspan=2>Suggested Handling</th>
    </tr>
  </thead>
  <thead>
    <tr>
      <th>Value</th>
      <th><code>card.type</code></th>
      <th><code>isPotentiallyValid</code></th>
      <th><code>isValid</code></th>
      <th>Render Invalid UI</th>
      <th>Allow Submit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>''</code></td>
      <td><code>null</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'6'</code></td>
      <td><code>null</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'60'</code></td>
      <td><code>'discover'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'601'</code></td>
      <td><code>'discover'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'6011'</code></td>
      <td><code>'discover'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'601'</code></td>
      <td><code>'discover'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'60'</code></td>
      <td><code>'discover'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'6'</code></td>
      <td><code>null</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>''</code></td>
      <td><code>null</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'x'</code></td>
      <td><code>null</code></td>
      <td>false</td>
      <td>false</td>
      <td><strong>yes</strong></td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>''</code></td>
      <td><code>null</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'4'</code></td>
      <td><code>'visa'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'41'</code></td>
      <td><code>'visa'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'411'</code></td>
      <td><code>'visa'</code></td>
      <td><strong>true</strong></td>
      <td>false</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td><code>'4111111111111111'</code></td>
      <td><code>'visa'</code></td>
      <td><strong>true</strong></td>
      <td><strong>true</strong></td>
      <td>no</td>
      <td><strong>yes</strong></td>
    </tr>
    <tr>
      <td><code>'411x'</code></td>
      <td><code>null</code></td>
      <td>false</td>
      <td>false</td>
      <td><strong>yes</strong></td>
      <td>no</td>
    </tr>
  </tbody>
</table>

---

#### `valid.cardholderName(value: string): object`

The `cardholderName` validation essentially tests for a valid string greater than 0 characters in length that does not look like a card number.

```javascript
{
  isPotentiallyValid: true,
  isValid: true
}
```

If a cardholder name is comprised of only numbers, hyphens and spaces, the validator considers it to be too card-like to be valid, but may still be potentially valid if a non-numeric character is added. This is to prevent card number values from being sent along as the cardholder name but not make too many assumptions about a person's cardholder name.

```javascript
{
  isPotentiallyValid: true,
  isValid: false
}
```

If a cardholder name is longer than 255 characters, it is assumed to be invalid.

```javascript
{
  isPotentiallyValid: false,
  isValid: false
}
```

#### `valid.expirationDate(value: string|object, maxElapsedYear: integer): object`

The `maxElapsedYear` parameter determines how many years in the future a card's expiration date should be considered valid. It has a default value of 19, so cards with an expiration date 20 or more years in the future would not be considered valid. It can be overridden by passing in an `integer` as a second argument.

```javascript
{
  isPotentiallyValid: true, // if false, indicates there is no way this could be valid in the future
  isValid: true,
  month: '10', // a string with the parsed month if valid, null if either month or year are invalid
  year: '2016' // a string with the parsed year if valid, null if either month or year are invalid
}
```

`expirationDate` will parse strings in a variety of formats:

| Input                                                                                       | Output                        |
| ------------------------------------------------------------------------------------------- | ----------------------------- |
| `'10/19'`<br/>`'10 / 19'`<br />`'1019'`<br/>`'10 19'`                                       | `{month: '10', year: '19'}`   |
| `'10/2019'`<br/>`'10 / 2019'`<br />`'102019'`<br/>`'10 2019'`<br/>`'10 19'`                 | `{month: '10', year: '2019'}` |
| `'2019-10'`                                                                                 | `{month: '10', year: '2019'}` |
| `{month: '01', year: '19'}`<br/>`{month: '1', year: '19'}`<br/>`{month: 1, year: 19}`       | `{month: '01', year: '19'}`   |
| `{month: '01', year: '2019'}`<br/>`{month: '1', year: '2019'}`<br/>`{month: 1, year: 2019}` | `{month: '01', year: '2019'}` |

---

#### `valid.expirationMonth(value: string): object`

`expirationMonth` accepts 1 or 2 digit months. `1`, `01`, `10` are all valid entries.

```javascript
{
  isValidForThisYear: false,
  isPotentiallyValid: true,
  isValid: true
}
```

---

#### `valid.expirationYear(value: string, maxElapsedYear: integer): object`

`expirationYear` accepts 2 or 4 digit years. `16` and `2016` are both valid entries.

The `maxElapsedYear` parameter determines how many years in the future a card's expiration date should be considered valid. It has a default value of 19, so cards with an expiration date 20 or more years in the future would not be considered valid. It can be overridden by passing in an `integer` as a second argument.

```javascript
{
  isCurrentYear: false,
  isPotentiallyValid: true,
  isValid: true
}
```

---

#### `valid.cvv(value: string, maxLength: integer): object`

The `cvv` validation by default tests for a numeric string of 3 characters in length. The `maxLength` can be overridden by passing in an `integer` as a second argument. You would typically switch this length from 3 to 4 in the case of an American Express card which expects a 4 digit CID.

```javascript
{
  isPotentiallyValid: true,
  isValid: true
}
```

---

#### `valid.postalCode(value: string, [options: object]): object`

The `postalCode` validation essentially tests for a valid string greater than 3 characters in length.

```javascript
{
  isPotentiallyValid: true,
  isValid: true
}
```

You can optionally pass `minLength` as a property of an object as a second argument. This will override the default min length of 3.

```javascript
valid.postalCode('123', {minLength: 5});

{
  isPotentiallyValid: true,
  isValid: false
}
```

## Custom Card Brands

Card Validator exposes the [`credit-card-type` module](https://github.com/braintree/credit-card-type) as `creditCardType`. You can add custom card brands by [utilizing the `addCard` method](https://github.com/braintree/credit-card-type#adding-card-types).

```javascript
valid.creditCardType.addCard({
  niceType: "NewCard",
  type: "new-card",
  patterns: [1234],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVV",
    size: 3,
  },
});
```

## Design decisions

- The default maximum expiration year is 19 years from now.
- `valid.expirationDate` will only return `month:` and `year:` as strings if the two are valid, otherwise they will be `null`.
- Since non-US postal codes are alpha-numeric, the `postalCode` will allow non-number characters to be used in validation.

## Development

We use `nvm` for managing our node versions, but you do not have to. Replace any `nvm` references with the tool of your choice below.

```sh
nvm install
npm install
```

All testing dependencies will be installed upon `npm install`. Run the test suite with `npm test`.
