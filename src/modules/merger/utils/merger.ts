import { toFunction } from "#modules/function/utils/toFunction";
import { mergeInto } from "#modules/merger/internals/mergeInto";
import type { MergeRule } from "#types/MergeRule";

/**
 * Returns a `merge` whose value for each key the sources hold, at every depth,
 * is `closure`'s return value, assigned to the target. `closure`, resolved once,
 * receives the key's own values in argument order, the target's first when it
 * holds the key, and a context whose `merge` applies the default rule.
 */
export function merger(
  closure: MergeRule,
): <Target extends object>(target: Target, ...sources: unknown[]) => Target {
  const rule = toFunction(closure);

  function merged<Target extends object>(
    target: Target,
    ...sources: unknown[]
  ): Target;
  function merged(
    target: Record<PropertyKey, unknown>,
    ...sources: unknown[]
  ): object {
    return mergeInto(target, sources, rule);
  }

  return merged;
}
