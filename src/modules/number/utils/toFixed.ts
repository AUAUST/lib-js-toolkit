/**
 * Formats the number as its method does.
 *
 * @throws {RangeError} when `fractionDigits` is outside 0 to 100.
 * @native equal Number.prototype.toFixed
 */
export function toFixed(value: number, fractionDigits?: number): string {
  return value.toFixed(fractionDigits);
}
