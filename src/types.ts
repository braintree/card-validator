export type Verification = {
  isValid: boolean;
  isPotentiallyValid: boolean;
};

export type CreditCardType = {
  niceType: string;
  type: string;
  patterns: Array<number[] | number>;
  gaps: number[];
  lengths: number[];
  code: {
    name: string;
    size: number;
  };
};

export type CardNumberOptions = {
  maxLength?: number;
  luhnValidateUnionPay?: boolean;
};

export type PostalCodeOptions = {
  minLength?: number;
};

export type MonthAndYear = {
  month: string;
  year: string;
};

export type CardNumberVerification = Verification & {
  card: CreditCardType | null;
};

export type ExpirationDateVerification = Verification & {
  month: string | null;
  year: string | null;
};

export type ExpirationMonthVerification = Verification & {
  isValidForThisYear: boolean;
};

export type ExpirationYearVerification = Verification & {
  isCurrentYear: boolean;
};
