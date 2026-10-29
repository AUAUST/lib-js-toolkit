export function sub(value: number, ...subtrahends: number[]): number {
  for (const subtrahend of subtrahends) {
    value -= subtrahend;
  }

  return value;
}
