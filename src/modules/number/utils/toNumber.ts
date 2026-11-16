/**
 * Converts input as `Number()` does; never mutates its input.
 *
 * @throws {TypeError} when the input is a symbol.
 * @shorthand n
 */
export function toNumber<Input extends number>(input: Input): Input;
export function toNumber(input: unknown): number;
export function toNumber(input: unknown): number {
  return Number(input);
}
