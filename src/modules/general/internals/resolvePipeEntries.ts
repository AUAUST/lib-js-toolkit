import { isArray } from "#modules/array/guards/isArray";
import { map } from "#modules/array/utils/map";
import { isBoolean } from "#modules/boolean/guards/isBoolean";
import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";

/**
 * Resolves `pipe` and `pipeAsync` entries once, each to its condition, its
 * callback as a function and the callback it was given.
 */
export function resolvePipeEntries(
  entries: readonly (Callee | [boolean | Callee, Callee])[],
): {
  condition: boolean | ((this: unknown, value: unknown) => unknown);
  callback(this: unknown, value: unknown): unknown;
  original: Callee;
}[] {
  return map(entries, (entry) => {
    if (isArray(entry)) {
      const [condition, callback] = entry;

      return {
        condition: isBoolean(condition) ? condition : toFunction(condition),
        callback: toFunction(callback),
        original: callback,
      };
    }

    return {
      condition: true,
      callback: toFunction(entry),
      original: entry,
    };
  });
}
