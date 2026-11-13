import { isArray } from "#modules/array/guards/isArray";
import { isFunction } from "#modules/function/guards/isFunction";
import { isSymbol } from "#modules/guard/guards/isSymbol";
import { isNaN } from "#modules/number/guards/isNaN";
import { isString } from "#modules/string/guards/isString";
import { toString } from "#modules/string/utils/toString";

const defaultTagPattern = /^\[object [^\]]+\]$/;

/** Returns a human-readable string or undefined when input has no interpretation; never mutates input. */
export function parseString(input: unknown): string | undefined {
  return parse(input, new Set());
}

function parse(input: unknown, seen: Set<unknown>): string | undefined {
  if (input == null || isFunction(input) || isNaN(input)) {
    return;
  }

  if (isString(input)) {
    return input;
  }

  if (isSymbol(input)) {
    return input.description;
  }

  if (isArray(input)) {
    if (seen.has(input)) {
      return;
    }

    seen.add(input);

    const elements = input
      .map((element) => {
        return parse(element, seen);
      })
      .filter((element) => {
        return element !== undefined;
      });

    seen.delete(input);

    return elements.length ? elements.join(", ") : undefined;
  }

  const result = toString(input);

  return defaultTagPattern.test(result) ? undefined : result;
}
