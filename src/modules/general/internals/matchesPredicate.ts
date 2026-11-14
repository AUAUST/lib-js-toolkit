import { isCallable } from "#modules/function/guards/isCallable";
import { call } from "#modules/general/utils/call";
import { sameValueZero } from "#modules/general/utils/sameValueZero";
import { isString } from "#modules/string/guards/isString";

/**
 * Tests one `match` predicate against the target: a callable's truthy result,
 * SameValueZero equality, or a `RegExp` tested from the start of a string target.
 */
export function matchesPredicate(predicate: unknown, target: unknown): boolean {
  return (
    (isCallable(predicate) && Boolean(call(predicate, target))) ||
    sameValueZero(predicate, target) ||
    (predicate instanceof RegExp &&
      isString(target) &&
      testsFromStart(predicate, target))
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
