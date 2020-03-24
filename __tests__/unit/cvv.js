const cvv = require('../../src/cvv');

describe('cvv', () => {
  describe('values', () => {
    const describes = {
      potentiallyValid: [
        ['', {isValid: false, isPotentiallyValid: true}],
        ['1', {isValid: false, isPotentiallyValid: true}],
        ['1', {isValid: false, isPotentiallyValid: true}, [3, 4]],
        ['1', {isValid: false, isPotentiallyValid: true}, [4, 3]],
        ['12', {isValid: false, isPotentiallyValid: true}],
        ['123', {isValid: false, isPotentiallyValid: true}, 4]
      ],

      'returns true for valid strings': [
        ['000', {isValid: true, isPotentiallyValid: true}],
        ['0000', {isValid: true, isPotentiallyValid: true}, 4],
        ['123', {isValid: true, isPotentiallyValid: true}],
        ['1234', {isValid: true, isPotentiallyValid: true}, 4],
        ['1234', {isValid: true, isPotentiallyValid: true}, [3, 4]],
        ['123', {isValid: true, isPotentiallyValid: true}, [3, 4]]
      ],

      'returns false for invalid strings': [
        ['12345', {isValid: false, isPotentiallyValid: false}],
        ['12345', {isValid: false, isPotentiallyValid: false}, [3, 4]],
        ['1234', {isValid: false, isPotentiallyValid: false}],
        ['1234', {isValid: false, isPotentiallyValid: false}, 3],
        ['foo', {isValid: false, isPotentiallyValid: false}],
        ['-123', {isValid: false, isPotentiallyValid: false}],
        ['12 34', {isValid: false, isPotentiallyValid: false}],
        ['12/34', {isValid: false, isPotentiallyValid: false}],
        ['Infinity', {isValid: false, isPotentiallyValid: false}]
      ],

      'returns false for non-string types': [
        [0, {isValid: false, isPotentiallyValid: false}],
        [123, {isValid: false, isPotentiallyValid: false}],
        [1234, {isValid: false, isPotentiallyValid: false}],
        [-1234, {isValid: false, isPotentiallyValid: false}],
        [-10, {isValid: false, isPotentiallyValid: false}],
        [0 / 0, {isValid: false, isPotentiallyValid: false}],
        [Infinity, {isValid: false, isPotentiallyValid: false}],
        [null, {isValid: false, isPotentiallyValid: false}],
        [[], {isValid: false, isPotentiallyValid: false}],
        [{}, {isValid: false, isPotentiallyValid: false}]
      ]
    };

    Object.keys(describes).forEach(key => {
      const tests = describes[key];

      describe(key, () => {
        tests.forEach(test => {
          const arg = test[0];
          const maxLength = test[2] || 3;
          const output = test[1];

          it(`returns ${JSON.stringify(output)} for "${arg}"`, () => {
            expect(cvv(arg, maxLength)).toEqual(output);
          });
        });
      });
    });
  });

  describe('maxLength', () => {
    it('defaults maxLength to 3', () => {
      expect(cvv('1234')).toEqual({isValid: false, isPotentiallyValid: false});
      expect(cvv('123')).toEqual({isValid: true, isPotentiallyValid: true});
    });

    it('accepts maxLength', () => {
      expect(cvv('1234', 4)).toEqual({isValid: true, isPotentiallyValid: true});
    });

    it('returns invalid if beyond maxLength', () => {
      expect(cvv('1234')).toEqual({isValid: false, isPotentiallyValid: false});
      expect(cvv('12345', 4)).toEqual({isValid: false, isPotentiallyValid: false});
    });
  });
});
