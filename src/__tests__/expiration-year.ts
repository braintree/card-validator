import { expirationYear, ExpirationYearVerification } from "../expiration-year";

const INVALID: ExpirationYearVerification = {
  isValid: false,
  isPotentiallyValid: false,
  isCurrentYear: false,
};

const POTENTIALLY_VALID: ExpirationYearVerification = {
  isValid: false,
  isPotentiallyValid: true,
  isCurrentYear: false,
};

const VALID: ExpirationYearVerification = {
  isValid: true,
  isPotentiallyValid: true,
  isCurrentYear: false,
};

const CURRENT_YEAR: ExpirationYearVerification = {
  isValid: true,
  isPotentiallyValid: true,
  isCurrentYear: true,
};

describe("expirationYear", () => {
  // Date picked at random from the past 5 years
  const mockToday = new Date(2021, 5, 9);
  jest.useFakeTimers().setSystemTime(mockToday);

  describe("given a non-string value", () => {
    test.each([
      [[], INVALID],
      [{}, INVALID],
      [null, INVALID],
      [undefined, INVALID], // eslint-disable-line no-undefined
      [Infinity, INVALID],
      [0 / 0, INVALID],
      [0, INVALID],
      [1, INVALID],
      [2, INVALID],
      [12, INVALID],
      [-1, INVALID],
      [-12, INVALID],
    ])("%p is invalid", (value, output) => {
      expect(expirationYear(value)).toEqual(output);
    });
  });

  describe("given an empty string", () => {
    it("returns as potentially valid", () => {
      expect(expirationYear("")).toEqual(POTENTIALLY_VALID);
    });
  });

  describe("given only whitespace", () => {
    it("returns as potentially valid", () => {
      expect(expirationYear("    ")).toEqual(POTENTIALLY_VALID);
    });
  });

  describe("given a malformed string value", () => {
    test.each([
      ["foo", INVALID],
      ["1.2", INVALID],
      ["1/20", INVALID],
      ["1 2", INVALID],
      ["1 ", INVALID],
      [" 1", INVALID],
      ["20015", INVALID],
    ])("%p is invalid", (value, output) => {
      expect(expirationYear(value)).toEqual(output);
    });
  });

  describe("given a 1 digit string", () => {
    describe("that's not a number", () => {
      test.each(["a", "#", ";", "\\", "+"])("%p is invalid", (value) => {
        expect(expirationYear(value)).toEqual(INVALID);
      });
    });

    describe("that is a number", () => {
      test.each(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])(
        "%p is potentially valid",
        (value) => {
          expect(expirationYear(value)).toEqual(POTENTIALLY_VALID);
        },
      );
    });
  });

  describe("given a 2 digit string", () => {
    test.each([
      ["19", INVALID],
      ["20", POTENTIALLY_VALID],
      ["21", CURRENT_YEAR],
      ["22", VALID],
      ["40", VALID],
      ["41", INVALID],
    ])("%p gives expected output", (value, output) => {
      expect(expirationYear(value)).toEqual(output);
    });
  });

  describe("given a 3 digit string", () => {
    test.each([
      ["000", INVALID],
      ["123", INVALID],
      ["200", POTENTIALLY_VALID],
      ["201", POTENTIALLY_VALID],
      ["202", POTENTIALLY_VALID],
      ["203", POTENTIALLY_VALID],
      ["204", POTENTIALLY_VALID],
      ["205", POTENTIALLY_VALID],
      ["206", POTENTIALLY_VALID],
      ["207", POTENTIALLY_VALID],
      ["208", POTENTIALLY_VALID],
      ["209", POTENTIALLY_VALID],
      ["210", INVALID],
      ["300", INVALID],
      ["999", INVALID],
    ])("%p gives expected output", (value, output) => {
      expect(expirationYear(value)).toEqual(output);
    });
  });

  describe("given a 4 digit string", () => {
    test.each([
      ["0000", INVALID],
      ["1234", INVALID],
      ["2020", INVALID],
      ["2021", CURRENT_YEAR],
      ["2022", VALID],
      ["2040", VALID],
      ["2041", INVALID],
      ["3000", INVALID],
      ["9999", INVALID],
    ])("%p gives expected output", (value, output) => {
      expect(expirationYear(value)).toEqual(output);
    });
  });

  describe("given a more than 4 digit string", () => {
    test.each(["00000", "12345", "20021", "20202", "20211", "30000", "99999"])(
      "%p is invalid",
      (value) => {
        expect(expirationYear(value)).toEqual(INVALID);
      },
    );
  });

  describe("given a custom max elapsed year", () => {
    it("uses it correctly", () => {
      expect(expirationYear("2020", 5)).toEqual(INVALID);
      expect(expirationYear("2021", 5)).toEqual(CURRENT_YEAR);
      expect(expirationYear("2022", 5)).toEqual(VALID);
      expect(expirationYear("2026", 5)).toEqual(VALID);
      expect(expirationYear("2027", 5)).toEqual(INVALID);
    });
  });
});
