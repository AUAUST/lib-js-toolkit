import { value } from "./value";

export function match(
  cases: readonly (readonly [unknown | readonly unknown[], unknown])[],
  target: unknown,
  fallback?: unknown
) {
  for (let [predicates, result] of cases) {
    if (!Array.isArray(predicates)) {
      predicates = [predicates];
    }

    for (const predicate of <unknown[]>predicates) {
      if (typeof predicate === "function" && predicate(target)) {
        return value(result);
      }

      if (predicate === target) {
        return value(result);
      }

      if (
        predicate instanceof RegExp &&
        typeof target === "string" &&
        predicate.test(target)
      ) {
        return value(result);
      }

      if (Number.isNaN(predicate) && Number.isNaN(target)) {
        return value(result);
      }
    }
  }

  return value(fallback);
}
