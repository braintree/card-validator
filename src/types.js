export interface Verification {
  isValid: boolean;
  isPotentiallyValid: boolean;
}

export interface CardNumberOptions {
  maxLength?: number;
  luhnValidateUnionPay?: boolean;
}

export interface CardNumberVerification {
  card: Record<string, any>; // TODO this will be a credit card type
  isPotentiallyValid: boolean;
  isValid: boolean;
}

export interface CvvOptions {
  minLength?: number;
}

export interface ExpirationDateVerification {
  isValid: boolean;
  isPotentiallyValid: boolean;
  month: string;
  year: string;
}

export interface ExpirationMonthVerification {
  isValid: boolean;
  isPotentiallyValid: boolean;
  isValidForThisYear: boolean;
}

export interface ExpirationYearVerification {
  isValid: boolean;
  isPotentiallyValid: boolean;
  isCurrentYear: boolean;
}

export interface MonthAndYear {
  month: string;
  year: string;
}

export interface PostalCodeOptions {
  minLength?: number;
}
