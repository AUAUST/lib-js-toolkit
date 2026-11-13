import { toBoolean } from "#modules/boolean/utils/toBoolean";
import { filled } from "#modules/general/utils/filled";
import { isObject } from "#modules/object/guards/isObject";
import { isString } from "#modules/string/guards/isString";

/**
 * Interprets a value as a boolean: `"false"`, blank strings, zero and empty containers are `false`; never mutates its input.
 */
export function parseBoolean(input: unknown): boolean {
  if (input == null) {
    return false;
  }

  if (isString(input)) {
    const normalized = input.trim().toLowerCase();

    return normalized !== "" && normalized !== "false";
  }

  if (isObject(input)) {
    return filled(input);
  }

  return toBoolean(input);
}
