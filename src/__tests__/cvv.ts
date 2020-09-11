import { cvv } from "../cvv";

describe("cvv", () => {
  describe("values", () => {
    describe.each([
      [
        "potentiallyValid",
        [
          ["", { isValid: false, isPotentiallyValid: true }],
          ["1", { isValid: false, isPotentiallyValid: true }],
          ["1", { isValid: false, isPotentiallyValid: true }, [3, 4]],
          ["1", { isValid: false, isPotentiallyValid: true }, [4, 3]],
          ["12", { isValid: false, isPotentiallyValid: true }],
          ["123", { isValid: false, isPotentiallyValid: true }, 4],
        ],
      ],

      [
        "returns true for valid strings",
        [
          ["000", { isValid: true, isPotentiallyValid: true }],
          ["0000", { isValid: true, isPotentiallyValid: true }, 4],
          ["123", { isValid: true, isPotentiallyValid: true }],
          ["1234", { isValid: true, isPotentiallyValid: true }, 4],
          ["1234", { isValid: true, isPotentiallyValid: true }, [3, 4]],
          ["123", { isValid: true, isPotentiallyValid: true }, [3, 4]],
        ],
      ],

      [
        "returns false for invalid strings",
        [
          ["12345", { isValid: false, isPotentiallyValid: false }],
          ["12345", { isValid: false, isPotentiallyValid: false }, [3, 4]],
          ["1234", { isValid: false, isPotentiallyValid: false }],
          ["1234", { isValid: false, isPotentiallyValid: false }, 3],
          ["foo", { isValid: false, isPotentiallyValid: false }],
          ["-123", { isValid: false, isPotentiallyValid: false }],
          ["12 34", { isValid: false, isPotentiallyValid: false }],
          ["12/34", { isValid: false, isPotentiallyValid: false }],
          ["Infinity", { isValid: false, isPotentiallyValid: false }],
        ],
      ],

      [
        "returns false for non-string types",
        [
          [0, { isValid: false, isPotentiallyValid: false }],
          [123, { isValid: false, isPotentiallyValid: false }],
          [1234, { isValid: false, isPotentiallyValid: false }],
          [-1234, { isValid: false, isPotentiallyValid: false }],
          [-10, { isValid: false, isPotentiallyValid: false }],
          [0 / 0, { isValid: false, isPotentiallyValid: false }],
          [Infinity, { isValid: false, isPotentiallyValid: false }],
          [null, { isValid: false, isPotentiallyValid: false }],
          [[], { isValid: false, isPotentiallyValid: false }],
          [{}, { isValid: false, isPotentiallyValid: false }],
        ],
      ],
    ])("%s", (description, tests) => {
      it.each(tests)("parses %s to be %p", (testCvv, meta, maxLength) => {
        if (typeof maxLength === "function") {
          // maxLength argument got converted to a done callback
          expect(cvv(testCvv)).toEqual(meta);
          maxLength();
        } else {
          expect(cvv(testCvv, maxLength)).toEqual(meta);
        }
      });
    });
  });

  describe("maxLength", () => {
    it("defaults maxLength to 3", () => {
      expect(cvv("1234")).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
      expect(cvv("123")).toEqual({ isValid: true, isPotentiallyValid: true });
    });

    it("accepts maxLength", () => {
      expect(cvv("1234", 4)).toEqual({
        isValid: true,
        isPotentiallyValid: true,
      });
    });

    it("returns invalid if beyond maxLength", () => {
      expect(cvv("1234")).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
      expect(cvv("12345", 4)).toEqual({
        isValid: false,
        isPotentiallyValid: false,
      });
    });
  });
});
