export function sum(...addends: number[]): number {
  let value = 0;

  for (const addend of addends) {
    value += addend;
  }

  return value;
}
