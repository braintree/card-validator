import { cardholderName } from "../cardholder-name";
import type { Verification } from "../types";
import { cvv } from '../cvv'

describe("cardholderName", () => {
  describe.each([
    [
      "returns false for non-string types",
      [
        [0, { isValid: false, isPotentiallyValid: false }],
        [0, { isValid: false, isPotentiallyValid: false }],
        [123, { isValid: false, isPotentiallyValid: false }],
        [1234, { isValid: false, isPotentiallyValid: false }],
        [12345, { isValid: false, isPotentiallyValid: false }],
        [557016, { isValid: false, isPotentiallyValid: false }],
        [-1234, { isValid: false, isPotentiallyValid: false }],
        [-10, { isValid: false, isPotentiallyValid: false }],
        [0 / 0, { isValid: false, isPotentiallyValid: false }],
        [Infinity, { isValid: false, isPotentiallyValid: false }],
        [null, { isValid: false, isPotentiallyValid: false }],
        [[], { isValid: false, isPotentiallyValid: false }],
        [{}, { isValid: false, isPotentiallyValid: false }],
      ],
    ],

    [
      "returns false strings that are longer than 24 characters",
      [
        [
          "this name is 25 chracters",
          { isValid: false, isPotentiallyValid: false },
        ],
      ],
    ],

    [
      "accepts valid cardholder names",
      [
        ["name", { isValid: true, isPotentiallyValid: true }],
        ["given sur", { isValid: true, isPotentiallyValid: true }],
        [
          "this name is 24 charssss",
          { isValid: true, isPotentiallyValid: true },
        ],
        ["name with many spaces", { isValid: true, isPotentiallyValid: true }],
        [
          "with number in it 01234",
          { isValid: true, isPotentiallyValid: true },
        ],
      ],
    ],

    [
      "returns isPotentiallyValid for shorter-than-1 strings",
      [["", { isValid: false, isPotentiallyValid: true }]],
    ],

    [
      "returns isPotentiallyValid for strings with only numbers, spaces, and hyphens",
      [
        ["4111", { isValid: false, isPotentiallyValid: true }],
        ["4111 1111", { isValid: false, isPotentiallyValid: true }],
        ["4111-1111", { isValid: false, isPotentiallyValid: true }],
      ],
    ],
  ] as Array<[string, Array<[string, Verification]>]>)(
    "%s",
    (description, tests) => {
      it.each(tests)("parses %s to be %p", (parseMe, meta) => {
        expect(cardholderName(parseMe)).toEqual(meta);
      });
    },
  );

  describe("maxLength", () => {
    it("defaults maxLength to 24", () => {
      expect(cardholderName("this name is 25 chracters")).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
      expect(cardholderName("this name is 24 charssss")).toEqual({ isValid: true, isPotentiallyValid: true });
    });

    it("accepts maxLength", () => {
      expect(cardholderName("this name is 25 chracters", 25)).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
    });

    it("returns invalid if beyond maxLength", () => {
      expect(cardholderName("this name is 25 chracters")).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
      expect(cardholderName("this name is 26 characters", 25)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });
});
