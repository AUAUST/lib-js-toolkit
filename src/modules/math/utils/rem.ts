export function rem(value: number, ...remainders: number[]): number {
  for (const remainder of remainders) {
    value %= remainder;
  }

  return value;
}
