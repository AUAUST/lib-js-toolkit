/**
 * Formats the number as its method does, throwing the same errors.
 *
 * @native equal Number.prototype.toExponential
 */
export function toExponential(value: number, fractionDigits?: number): string {
  return value.toExponential(fractionDigits);
}
