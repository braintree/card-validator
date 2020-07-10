import { cardNumber, CardNumberVerification } from "../card-number";

describe("number validates", () => {
  describe.each([
    [
      "partial validation sequences",
      [
        ["", { card: null, isPotentiallyValid: true, isValid: false }],
        ["6", { card: null, isPotentiallyValid: true, isValid: false }],
        ["60", { card: null, isPotentiallyValid: true, isValid: false }],
        ["601", { card: null, isPotentiallyValid: true, isValid: false }],
        [
          "6011",
          { card: "discover", isPotentiallyValid: true, isValid: false },
        ],
        ["4", { card: null, isPotentiallyValid: true, isValid: false }],
        ["41", { card: "visa", isPotentiallyValid: true, isValid: false }],
        ["411", { card: "visa", isPotentiallyValid: true, isValid: false }],
        ["", { card: null, isPotentiallyValid: true, isValid: false }],
        ["x", { card: null, isPotentiallyValid: false, isValid: false }],
        ["123", { card: null, isPotentiallyValid: false, isValid: false }],
      ],
    ],
    [
      "normal cases",
      [
        [
          "4012888888881881",
          { card: "visa", isPotentiallyValid: true, isValid: true },
        ],
        [
          "62123456789002",
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
        [
          "621234567890003",
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
        [
          "6288997715452584",
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
        [
          "6282001509099283",
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
        [
          "6269992058134322",
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
        [
          "6240008631401148",
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
        [
          "6221558812340000", // UnionPay is not always Luhn10 valid
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
        [
          "4111111111111111",
          { card: "visa", isPotentiallyValid: true, isValid: true },
        ],
        [
          "4111111111111111",
          { card: "visa", isPotentiallyValid: true, isValid: true },
        ],
        [
          "6011000990139424",
          { card: "discover", isPotentiallyValid: true, isValid: true },
        ],
        ["411111y", { card: null, isPotentiallyValid: false, isValid: false }],
        [
          "41111111111111111111", // Too long
          { card: "visa", isPotentiallyValid: false, isValid: false },
        ],
        [
          "4111111111111112", // right length, not Luhn, potentialls valid because visas can be 19 digits
          { card: "visa", isPotentiallyValid: true, isValid: false },
        ],
      ],
    ],
    [
      "weird formatting",
      [
        [
          "4111-1111-1111-1111",
          { card: "visa", isPotentiallyValid: true, isValid: true },
        ],
        [
          "4111 1111 1111 1111",
          { card: "visa", isPotentiallyValid: true, isValid: true },
        ],
        [
          "601 1 1 1  1 1 1 1   1 1 1 1 1 7",
          { card: "discover", isPotentiallyValid: true, isValid: true },
        ],
      ],
    ],
    [
      "Discover",
      [
        [
          "6011111",
          { card: "discover", isPotentiallyValid: true, isValid: false },
        ],
        [
          "6011111111111117",
          { card: "discover", isPotentiallyValid: true, isValid: true },
        ],
      ],
    ],
    [
      "MasterCard",
      [
        ["2", { card: null, isPotentiallyValid: true, isValid: false }],
        [
          "27",
          { card: "mastercard", isPotentiallyValid: true, isValid: false },
        ],
        [
          "272",
          { card: "mastercard", isPotentiallyValid: true, isValid: false },
        ],
        [
          "2720",
          { card: "mastercard", isPotentiallyValid: true, isValid: false },
        ],
        [
          "55555555",
          { card: "mastercard", isPotentiallyValid: true, isValid: false },
        ],
        [
          "5555555555554444",
          { card: "mastercard", isPotentiallyValid: true, isValid: true },
        ],
        [
          "5555555555554446",
          { card: "mastercard", isPotentiallyValid: false, isValid: false },
        ],
      ],
    ],
    [
      "Maestro",
      [
        [
          "602011",
          { card: "maestro", isPotentiallyValid: true, isValid: false },
        ],
        [
          "500000000000",
          { card: "maestro", isPotentiallyValid: true, isValid: false },
        ],
        [
          "500000000000061",
          { card: "maestro", isPotentiallyValid: true, isValid: false },
        ],
        [
          "5000000000000611",
          { card: "maestro", isPotentiallyValid: true, isValid: true },
        ],
        [
          "5000000000000612",
          { card: "maestro", isPotentiallyValid: true, isValid: false },
        ],
        [
          "500000000000000005",
          { card: "maestro", isPotentiallyValid: true, isValid: false },
        ],
        [
          "5000000000000000005",
          { card: "maestro", isPotentiallyValid: true, isValid: true },
        ],
        [
          "5000000000000000001",
          { card: "maestro", isPotentiallyValid: false, isValid: false },
        ],
        [
          "50000000000000000009",
          { card: "maestro", isPotentiallyValid: false, isValid: false },
        ],
      ],
    ],
    [
      "Amex",
      [
        [
          "3782",
          {
            card: "american-express",
            isPotentiallyValid: true,
            isValid: false,
          },
        ],
        [
          "378282246310005",
          { card: "american-express", isPotentiallyValid: true, isValid: true },
        ],
      ],
    ],
    [
      "JCB",
      [
        ["1", { card: "jcb", isPotentiallyValid: true, isValid: false }],
        ["21", { card: "jcb", isPotentiallyValid: true, isValid: false }],
        ["3530111", { card: "jcb", isPotentiallyValid: true, isValid: false }],
        [
          "3530111333300000",
          { card: "jcb", isPotentiallyValid: true, isValid: true },
        ],
      ],
    ],
    [
      "UnionPay",
      [
        ["6", { card: null, isPotentiallyValid: true, isValid: false }],
        ["62", { card: null, isPotentiallyValid: true, isValid: false }],
        [
          "623456",
          { card: "unionpay", isPotentiallyValid: true, isValid: false },
        ],
        [
          "6212345678901232",
          { card: "unionpay", isPotentiallyValid: true, isValid: true },
        ],
      ],
    ],
    [
      "edge cases",
      [
        ["", { card: null, isPotentiallyValid: true, isValid: false }],
        ["foo", { card: null, isPotentiallyValid: false, isValid: false }],
        [{}, { card: null, isPotentiallyValid: false, isValid: false }],
        [[], { card: null, isPotentiallyValid: false, isValid: false }],
        ["32908234", { card: null, isPotentiallyValid: false, isValid: false }],
        [32908234, { card: null, isPotentiallyValid: false, isValid: false }],
        [
          4111111111111111,
          { card: "visa", isPotentiallyValid: true, isValid: true },
        ],
        [true, { card: null, isPotentiallyValid: false, isValid: false }],
        [false, { card: null, isPotentiallyValid: false, isValid: false }],
      ],
    ],
  ] as Array<[string, Array<[string, CardNumberVerification]>]>)(
    "Validator for %s",
    (description, tests) => {
      describe.each(tests)("when number is %p", (number, expected) => {
        const actual = cardNumber(number);

        it(`card: is ${expected.card} for ${number}`, () => {
          if (expected.card) {
            expect(actual.card.type).toBe(expected.card);
          } else {
            expect(actual.card).toBeNull();
          }
        });

        it(`isPotentiallyValid: is ${expected.isPotentiallyValid} for ${number}`, () => {
          expect(actual.isPotentiallyValid).toBe(expected.isPotentiallyValid);
        });

        it(`valid: is ${expected.isValid} for ${number}`, () => {
          expect(actual.isValid).toBe(expected.isValid);
        });
      });
    }
  );

  describe("UnionPay", () => {
    describe("where card number is luhn invalid", () => {
      const number = "6212345000000001";

      it("marks card valid by default", () => {
        const actual = cardNumber(number);

        expect(actual.card.type).toBe("unionpay");
        expect(actual.isPotentiallyValid).toBe(true);
        expect(actual.isValid).toBe(true);
      });

      it('marks card invalid when "luhnValidateUnionPay" is present', () => {
        const options = {
          luhnValidateUnionPay: true,
        };

        const actual = cardNumber(number, options);

        expect(actual.card.type).toBe("unionpay");
        expect(actual.isPotentiallyValid).toBe(true);
        expect(actual.isValid).toBe(false);
      });
    });
  });

  describe('with "maxCardLength" option', () => {
    it("marks card invalid when card is longer than the max length", () => {
      const options = {
        maxLength: 16,
      };

      let actual = cardNumber("4111 1111 1111 1111 110", options);

      expect(actual.card.type).toBe("visa");
      expect(actual.isPotentiallyValid).toBe(false);
      expect(actual.isValid).toBe(false);

      options.maxLength = 19;
      actual = cardNumber("4111 1111 1111 1111 110", options);

      expect(actual.card.type).toBe("visa");
      expect(actual.isPotentiallyValid).toBe(true);
      expect(actual.isValid).toBe(true);
    });

    it("marks card as not potentially valid when card is equal to max length and not luhn valid", () => {
      const options = {
        maxLength: 16,
      };

      const actual = cardNumber("4111 1111 1111 1112", options);

      expect(actual.card.type).toBe("visa");
      expect(actual.isPotentiallyValid).toBe(false);
      expect(actual.isValid).toBe(false);
    });

    it("marks card as valid and potentially valid when card is equal to max length and luhn valid", () => {
      const options = {
        maxLength: 16,
      };

      const actual = cardNumber("4111 1111 1111 1111", options);

      expect(actual.card.type).toBe("visa");
      expect(actual.isPotentiallyValid).toBe(true);
      expect(actual.isValid).toBe(true);
    });

    it("uses the lesser value for max length if the card brands largest length value is smaller than the configured one", () => {
      const options = {
        maxLength: 16,
      };

      // amex has a max length of 15
      const actual = cardNumber("378282246310005", options);

      expect(actual.card.type).toBe("american-express");
      expect(actual.isPotentiallyValid).toBe(true);
      expect(actual.isValid).toBe(true);
    });
  });
});
