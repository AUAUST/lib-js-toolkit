export function div(value: number, ...divisors: number[]): number {
  for (const divisor of divisors) {
    value /= divisor;
  }

  return value;
}
