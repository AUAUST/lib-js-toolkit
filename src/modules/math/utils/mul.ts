export function mul(...factors: number[]): number {
  let value = 1;

  for (const factor of factors) {
    value *= factor;
  }

  return value;
}
