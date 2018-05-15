# Credit Card Validator [![Build Status](https://travis-ci.org/braintree/card-validator.svg)](https://travis-ci.org/braintree/card-validator) [![npm version](https://badge.fury.io/js/card-validator.svg)](http://badge.fury.io/js/card-validator)

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
var valid = require('card-validator');

var numberValidation = valid.number('4111');

if (!numberValidation.isPotentiallyValid) {
  renderInvalidCardNumber();
}

if (numberValidation.card) {
  console.log(numberValidation.card.type); // 'visa'
}
```

## API

### `var valid = require('card-validator');`

- - -

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

If a valid card type cannot be determined, `number()` will return `null`;

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

- - -

You can also pass in a creditCardType option to override the default `credit-card-type` module that is used to determine what type of card it is. This is particularly useful when using [`credit-card-type`](https://www.npmjs.com/package/credit-card-type) separately and you want to ensure that the same version of credit-card-type is used in `card-validator`.

```javascript
var result = valid.number('', {
  // in this contrived example, we're forcing
  // credit card type to always return the same
  // card type. Not a lot of real world application
  // here, but could be useful for unit tests
  creditCardType: function () {
    return [{
      type: 'foo',
      niceType 'Foo Card',
      gaps: [4, 10],
      lengths: [15],
      code: {name: 'FOO', size: 4}
    }]
  }
})

// result equals
// {
//   card: {
//     type: 'foo',
//     niceType 'Foo Card',
//     gaps: [4, 10],
//     lengths: [15],
//     code: {name: 'FOO', size: 4}
//   },
//   isPotentiallyValid: true, // if false, indicates there is no way the card could be valid
//   isValid: true // if true, number is valid for submission
// }
```

#### `valid.expirationDate(value: string|object, maxElapsedYear: integer): object`

The `maxElapsedYear` has a default value of 19. It can be overridden by passing in an `integer` as a second argument.

```javascript
{
  isPotentiallyValid: true, // if false, indicates there is no way this could be valid in the future
  isValid: true,
  month: '10', // a string with the parsed month if valid, null if either month or year are invalid
  year: '2016' // a string with the parsed year if valid, null if either month or year are invalid
}
```

`expirationDate` will parse strings in a variety of formats:

| Input                                                                                     | Output                        |
|-------------------------------------------------------------------------------------------|-------------------------------|
| `'10/19'`<br/>`'10 / 19'`<br />`'1019'`<br/>`'10 19'`                                     | `{month: '10', year: '19'}`   |
| `'10/2019'`<br/>`'10 / 2019'`<br />`'102019'`<br/>`'10 2019'`<br/>`'10 19'`               | `{month: '10', year: '2019'}` |
| `{month: '01', year: '19'}`<br/>`{month: '1', year: '19'}`<br/>`{month: 1, year: 19}`     | `{month: '01', year: '19'}`   |
| `{month: '10', year: '2019'}`<br/>`{month: '1', year: '2019'}`<br/>`{month: 1, year: 19}` | `{month: '10', year: '2019'}` |

- - -

#### `valid.expirationMonth(value: string): object`

`expirationMonth` accepts 1 or 2 digit months. `1`, `01`, `10` are all valid entries.

```javascript
{
  isValidForThisYear: false,
  isPotentiallyValid: true,
  isValid: true
}
```

- - -

#### `valid.expirationYear(value: string, maxElapsedYear: integer): object`

`expirationYear` accepts 2 or 4 digit years. `16` and `2016` are both valid entries.

The `maxElapsedYear` has a default value of 19. It can be overridden by passing in an `integer` as a second argument.

```javascript
{
  isCurrentYear: false,
  isPotentiallyValid: true,
  isValid: true
}
```

- - -

#### `valid.cvv(value: string, maxLength: integer): object`

The `cvv` validation by default tests for a numeric string of 3 characters in length. The `maxLength` can be overridden by passing in an `integer` as a second argument. You would typically switch this length from 3 to 4 in the case of an American Express card which expects a 4 digit CID.

```javascript
{
  isPotentiallyValid: true,
  isValid: true
}
```

- - -

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
  niceType: 'NewCard',
  type: 'new-card',
  prefixPattern: /^(2|23|234)$/,
  exactPattern: /^(2345)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3
  }
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
