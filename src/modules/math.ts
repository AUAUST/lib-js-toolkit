export const abs = Math.abs;

export const acos = Math.acos;

export const acosh = Math.acosh;

export const asin = Math.asin;

export const asinh = Math.asinh;

export const atan = Math.atan;

export const atan2 = Math.atan2;

export const atanh = Math.atanh;

export const cbrt = Math.cbrt;

export const ceil = Math.ceil;

export function clamp(value: number, min: number, max: number): number;
export function clamp(
  value: number,
  minValue: number,
  maxValue: number,
): number {
  return min(max(value, minValue), maxValue);
}

export const clz32 = Math.clz32;

export const cos = Math.cos;

export const cosh = Math.cosh;

export function div(value: number, ...divisors: number[]): number {
  for (const divisor of divisors) {
    value /= divisor;
  }

  return value;
}

export const exp = Math.exp;

export const expm1 = Math.expm1;

export const f16round = Math.f16round;

export const floor = Math.floor;

export const fround = Math.fround;

export const hypot = Math.hypot;

export const imul = Math.imul;

export const isNaN = Number.isNaN as {
  (number: number): boolean;
  (number: unknown): number is number;
};

export const isFinite = Number.isFinite as {
  (number: number): boolean;
  (number: unknown): number is number;
};

export const isInteger = Number.isInteger as {
  (number: number): boolean;
  (number: unknown): number is number;
};

export const isSafeInteger = Number.isSafeInteger as {
  (number: number): boolean;
  (number: unknown): number is number;
};

export const log = Math.log;

export const log10 = Math.log10;

export const log1p = Math.log1p;

export const log2 = Math.log2;

export const max = Math.max;

export const min = Math.min;

export function mul(value: number, ...factors: number[]): number {
  for (const factor of factors) {
    value *= factor;
  }

  return value;
}

export const pow = Math.pow;

export function rem(value: number, ...remainders: number[]): number {
  for (const remainder of remainders) {
    value %= remainder;
  }

  return value;
}

export const random = Math.random;

export const round = Math.round;

export const sign = Math.sign;

export const sin = Math.sin;

export const sinh = Math.sinh;

export const sqrt = Math.sqrt;

export function sub(value: number, ...subtrahends: number[]): number {
  for (const subtrahend of subtrahends) {
    value -= subtrahend;
  }

  return value;
}

export function sum(...addends: number[]): number {
  let value = 0;

  for (const addend of addends) {
    value += addend;
  }

  return value;
}

export const tan = Math.tan;

export const tanh = Math.tanh;

export const trunc = Math.trunc;
