/**
 * Formats the number as its method does, throwing the same errors.
 *
 * @native equal Number.prototype.toPrecision
 */
export function toPrecision(value: number, precision?: number): string {
  return value.toPrecision(precision);
}
