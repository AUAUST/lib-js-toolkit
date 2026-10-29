export function mul(value: number, ...factors: number[]): number {
  for (const factor of factors) {
    value *= factor;
  }

  return value;
}
