import {
  expirationMonth,
  ExpirationMonthVerification,
} from "../expiration-month";

const currentMonth = new Date().getMonth() + 1;
const previousMonth = currentMonth - 1 || 1;
const nextMonth = currentMonth < 12 ? currentMonth + 1 : currentMonth;

describe("expirationMonth", () => {
  const FALSE_VALIDATION = {
    isValid: false,
    isPotentiallyValid: false,
    isValidForThisYear: false,
  };
  const TRUE_VALIDATION = {
    isValid: true,
    isPotentiallyValid: true,
    isValidForThisYear: true,
  };

  const contexts = [
    [
      "returns false if not a string",
      [
        [[], FALSE_VALIDATION],
        [{}, FALSE_VALIDATION],
        [null, FALSE_VALIDATION],
        [undefined, FALSE_VALIDATION], // eslint-disable-line no-undefined
        [Infinity, FALSE_VALIDATION],
        [0 / 0, FALSE_VALIDATION],
        [0, FALSE_VALIDATION],
        [1, FALSE_VALIDATION],
        [2, FALSE_VALIDATION],
        [12, FALSE_VALIDATION],
        [13, FALSE_VALIDATION],
        [-1, FALSE_VALIDATION],
        [-12, FALSE_VALIDATION],
      ],
    ],

    [
      "returns false for malformed strings",
      [
        ["foo", FALSE_VALIDATION],
        ["1.2", FALSE_VALIDATION],
        ["1/20", FALSE_VALIDATION],
        ["1 2", FALSE_VALIDATION],
        ["1 ", FALSE_VALIDATION],
        [" 1", FALSE_VALIDATION],
      ],
    ],

    [
      "returns null for incomplete input",
      [
        [
          "",
          {
            isValid: false,
            isPotentiallyValid: true,
            isValidForThisYear: false,
          },
        ],
        [
          "0",
          {
            isValid: false,
            isPotentiallyValid: true,
            isValidForThisYear: false,
          },
        ],
      ],
    ],

    [
      "valid month",
      [
        [currentMonth.toString(), TRUE_VALIDATION],
        [nextMonth.toString(), TRUE_VALIDATION],
        [
          "1",
          {
            isValid: true,
            isPotentiallyValid: true,
            isValidForThisYear: currentMonth <= 1,
          },
        ],
        [
          "2",
          {
            isValid: true,
            isPotentiallyValid: true,
            isValidForThisYear: currentMonth <= 2,
          },
        ],
        [
          "5",
          {
            isValid: true,
            isPotentiallyValid: true,
            isValidForThisYear: currentMonth <= 5,
          },
        ],
        [
          "02",
          {
            isValid: true,
            isPotentiallyValid: true,
            isValidForThisYear: currentMonth <= 2,
          },
        ],
        [
          "12",
          {
            isValid: true,
            isPotentiallyValid: true,
            isValidForThisYear: true,
          },
        ],
      ],
    ],

    [
      "invalid month",
      [
        ["14", FALSE_VALIDATION],
        ["30", FALSE_VALIDATION],
        ["-6", FALSE_VALIDATION],
        ["20", FALSE_VALIDATION],
        ["-1", FALSE_VALIDATION],
        ["13", FALSE_VALIDATION],
      ],
    ],
  ] as Array<[string, Array<[number | string, ExpirationMonthVerification]>]>;

  if (currentMonth !== 1) {
    contexts.push([
      "invalid month",
      [
        [
          previousMonth.toString(),
          {
            isValid: currentMonth !== 1,
            isPotentiallyValid: true,
            isValidForThisYear: false,
          },
        ],
      ],
    ]);
  }

  describe.each(contexts)("%s", (description, tests) => {
    it.each(tests)("parses %s to be %p", (exp, meta) => {
      expect(expirationMonth(exp)).toEqual(meta);
    });
  });
});
