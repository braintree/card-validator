import type { Verification } from "./types";

const DEFAULT_LENGTH = 3;

function includes(array: number[], thing: number): boolean {
  for (let i = 0; i < array.length; i++) {
    if (thing === array[i]) {
      return true;
    }
  }

  return false;
}

function max(array: number[]): number {
  let maximum = DEFAULT_LENGTH;
  let i = 0;

  for (; i < array.length; i++) {
    maximum = array[i] > maximum ? array[i] : maximum;
  }

  return maximum;
}

function verification(
  isValid: boolean,
  isPotentiallyValid: boolean
): Verification {
  return { isValid, isPotentiallyValid };
}

export function cvv(
  value: string | unknown,
  maxLength: number | number[] = DEFAULT_LENGTH
): Verification {
  maxLength = maxLength instanceof Array ? maxLength : [maxLength];

  if (typeof value !== "string") {
    return verification(false, false);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }
  if (includes(maxLength, value.length)) {
    return verification(true, true);
  }
  if (value.length < Math.min.apply(null, maxLength)) {
    return verification(false, true);
  }
  if (value.length > max(maxLength)) {
    return verification(false, false);
  }

  return verification(true, true);
}
