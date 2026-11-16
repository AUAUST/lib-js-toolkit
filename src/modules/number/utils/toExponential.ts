/**
 * Formats the number as its method does.
 *
 * @throws {RangeError} when `fractionDigits` is outside 0 to 100.
 * @native equal Number.prototype.toExponential
 */
export function toExponential(value: number, fractionDigits?: number): string {
  return value.toExponential(fractionDigits);
}
