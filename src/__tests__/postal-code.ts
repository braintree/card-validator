import { postalCode } from "../postal-code";
import type { Verification } from "../types";

describe("postalCode", () => {
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
      "accepts valid postal codes",
      [
        ["123", { isValid: true, isPotentiallyValid: true }],
        ["1234", { isValid: true, isPotentiallyValid: true }],
        ["12345", { isValid: true, isPotentiallyValid: true }],
        ["12345", { isValid: true, isPotentiallyValid: true }],
        ["557016", { isValid: true, isPotentiallyValid: true }], // Romania
        ["110001", { isValid: true, isPotentiallyValid: true }], // India
        ["SE1 2LN", { isValid: true, isPotentiallyValid: true }], // UK
        ["S9 1DF", { isValid: true, isPotentiallyValid: true }], // UK
        ["AA9A 9AA", { isValid: true, isPotentiallyValid: true }], // UK
        ["01234567890123456789", { isValid: true, isPotentiallyValid: true }], // some hypothetical country
      ],
    ],

    [
      "doesn't reject non-numeric strings",
      [["hello world", { isValid: true, isPotentiallyValid: true }]],
    ],

    [
      "returns isPotentiallyValid for strings without alphanumeric first three characters",
      [
        ["123", { isValid: true, isPotentiallyValid: true }],
        ["  123", { isValid: true, isPotentiallyValid: true }],
        ["---", { isValid: false, isPotentiallyValid: true }],
        ["   ---", { isValid: false, isPotentiallyValid: true }],
      ],
    ],

    [
      "returns isPotentiallyValid for shorter-than-2 strings",
      [
        ["", { isValid: false, isPotentiallyValid: true }],
        ["1", { isValid: false, isPotentiallyValid: true }],
        ["12", { isValid: true, isPotentiallyValid: true }],
      ],
    ],
  ] as Array<[string, Array<[string, Verification]>]>)(
    "%s",
    (description, tests) => {
      it.each(tests)("parses %s to be %p", (parseMe, meta) => {
        expect(postalCode(parseMe)).toEqual(meta);
      });
    },
  );

  describe("custom min length", () => {
    it("uses default min length when no minLength option is passed", () => {
      expect(postalCode("123")).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
      expect(postalCode("123", {})).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
      expect(postalCode("12")).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
      expect(postalCode("12", {})).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
      expect(postalCode("1")).toEqual({
        isValid: false,
        isPotentiallyValid: true,
      });
      expect(postalCode("1", {})).toEqual({
        isValid: false,
        isPotentiallyValid: true,
      });
    });

    it("allows passing in a custom min length", () => {
      expect(postalCode("123", { minLength: 4 })).toEqual({
        isValid: false,
        isPotentiallyValid: true,
      });
      expect(postalCode("1234", { minLength: 4 })).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
      expect(postalCode(" -$%", { minLength: 0 })).toEqual({
        isValid: false,
        isPotentiallyValid: true,
      });
    });
  });
});
