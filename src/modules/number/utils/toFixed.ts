/**
 * Formats the number as its method does, throwing the same errors.
 *
 * @native equal Number.prototype.toFixed
 */
export function toFixed(value: number, fractionDigits?: number): string {
  return value.toFixed(fractionDigits);
}
