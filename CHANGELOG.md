# 8.1.1

- Fix issue where a potentially valid year would evaulate as invalid (#93)

# 8.1.0

- Add `cardholderName` verification method

# 8.0.0

_Breaking Changes_

- Use `export =` instead of `export default` for main export (use `"esModuleInterop": true` flag in your tsconfig to maintain the `default` module behavior)

# 7.1.0

- The cardValidator object is now available as the `default` import when using es modules (thanks @leomp12)

# 7.0.1

- Fixup export for credit-card-type for typescript projects (closes #79)

# 7.0.0

- Add typescript types

_Breaking Changes_

- Upgrade credit-card-type to v9.0.0
  - Drop support for card numbers instantiated with `new String(number)`

# 6.2.0

- Adjust expiration date to accept dates formatted as `YYYY-MM` (the HTML autofill spec). Closes #69 (thanks @schuylr)

  # 6.1.0

- Add option to set a `maxLength` for card number valiation

  # 6.0.0

- Update credit-card-type to v8.0.0

_Breaking Changes_

- When adding or updating cards, this module no longer uses an `exactPattern` and `prefixPattern` model. Instead, it takes an array of patterns. See https://github.com/braintree/credit-card-type#pattern-detection for details.

  # 5.1.0

- Add optional options object with `luhnValidateUnionPay` parameter to force luhn validity check of UnionPay cards
- Update tests to account for ELO cards

  # 5.0.0

- Update `credit-card-type` to v7.0.0

_Breaking Changes_

- Mastercard enum changed from `master-card` to `mastercard`

  # 4.3.0

- Support custom card brands
- Require minimum version of credit-card-type to be v6.2.0

  # 4.2.0

- Allow `maxElapsedYear` to be configurable in `expirationYear` and `expirationDate` (thanks @wozaki)

  # 4.1.1

- Update `credit-card-type` to v6.0.0

  # 4.1.0

- Add options object for postal code validation to specify min length

  # 4.0.0

- **Breaking change**: Remove `dist` files. You must use `npm` to use this module
- **Breaking change**: Remove support for primitive constructors like `new String()`

  # 3.0.1

- Fix postal code validation to be valid if 3 or more characters

  # 3.0.0

- correctly identify Maestro cards beginning with `6`
- **Breaking change**: The format of the `card` object returned has changed. `pattern` has been replaced by `prefixPattern` and `exactPattern`.

  # 2.3.0

- valid.expirationDate can take an object with month and year fields or a string value

  # 2.2.8

- Update `dist` to include version `4.0.3` of credit-card-type

  # 2.2.7

- Including `dist` from `2.2.6`

  # 2.2.6

- Fixes cases where card numbers were incorrectly reported as `isPotentiallyValid: false` when more digits could still be entered

  - issue #20 and PR #21

  # 2.2.5

- Fixes expiration date results when year is current year and month is invalid
- Update files in `dist/`
- Readme clarifications

  # 2.2.4

- Fixes validation of space separated expiration dates
- Fixes potential validity of slashless expiration dates
- Fixes validation of expiration dates that are too long

  # 2.2.3

- Fixes CVV validation to not always validate 3-digit values as `isValid: true`

  # 2.2.2

- Fixes 3-digit expiration date handling, such as 220 being Feb, 2020

  # 2.2.1

- Use one Lodash dependency

  # 2.2.0

- CVV validator can accept an array of possible length values

  # 2.1.0

- Contextually validate month based on current date.

  # 2.0.2

- Update `credit-card-type` to 4.0.0

  # 2.0.1

- The npm module now includes built files under `dist/`.

  # 2.0.0

- The returned value for `card.length` is now an `Array` and called `card.lengths` to account for variable-length cards such as UnionPay.

  # 1.0.0

- Initial release
