/**
 * Converts input as `Number()` does, throwing `TypeError` for symbols; never mutates its input.
 *
 * @shorthand n */
export function toNumber<Input extends number>(input: Input): Input;
export function toNumber(input: unknown): number;
export function toNumber(input: unknown): number {
  return Number(input);
}
