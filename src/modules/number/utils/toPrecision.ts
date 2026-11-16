/**
 * Formats the number as its method does.
 *
 * @throws {RangeError} when `precision` is outside 1 to 100.
 * @native equal Number.prototype.toPrecision
 */
export function toPrecision(value: number, precision?: number): string {
  return value.toPrecision(precision);
}
