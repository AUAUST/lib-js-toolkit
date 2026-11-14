import { isCallable } from "#modules/function/guards/isCallable";
import { call } from "#modules/general/utils/call";
import { isNaN } from "#modules/number/guards/isNaN";
import { isString } from "#modules/string/guards/isString";

/**
 * Tests one `match` predicate against the target: a callable's truthy result,
 * identity, a `RegExp` tested from the start of a string target, or `NaN`.
 */
export function matchesPredicate(predicate: unknown, target: unknown): boolean {
  return (
    (isCallable(predicate) && Boolean(call(predicate, target))) ||
    predicate === target ||
    (predicate instanceof RegExp &&
      isString(target) &&
      testsFromStart(predicate, target)) ||
    (isNaN(predicate) && isNaN(target))
  );
}

// @debt Reimplements `String#search` because `unicorn/prefer-regexp-test` rejects it for existence checks.
function testsFromStart(predicate: RegExp, target: string): boolean {
  if (!predicate.global && !predicate.sticky) {
    return predicate.test(target);
  }

  const { lastIndex } = predicate;

  predicate.lastIndex = 0;

  try {
    return predicate.test(target);
  } finally {
    predicate.lastIndex = lastIndex;
  }
}
