import { isArray } from "#modules/array/guards/isArray";
import { join } from "#modules/array/utils/join";
import { map } from "#modules/array/utils/map";
import { isString } from "#modules/string/guards/isString";

/**
 * Converts input to a string without mutation; objects without conversion
 * hooks throw natively.
 *
 * @shorthand s
 */
export function toString<Input extends string>(input: Input): Input;
export function toString(input: unknown): string;
export function toString(input: unknown): string {
  return convert(input, new Set());
}

function convert(input: unknown, seen: Set<unknown>): string {
  if (input == null) {
    return "";
  }

  if (isString(input)) {
    return input;
  }

  if (!isArray(input)) {
    return String(input);
  }

  if (seen.has(input)) {
    return "";
  }

  seen.add(input);

  const converted = map(input, (element) => convert(element, seen));

  const result = join(converted, ",");

  seen.delete(input);

  return result;
}
