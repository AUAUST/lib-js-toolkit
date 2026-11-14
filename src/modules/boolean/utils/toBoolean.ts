/**
 * Converts any value to a boolean by truthiness, as `!!value`; never mutates its
 * input.
 *
 * @shorthand b
 */
export function toBoolean<Input extends boolean>(input: Input): Input;
export function toBoolean(input: unknown): boolean;
export function toBoolean(input: unknown): boolean {
  return !!input;
}
