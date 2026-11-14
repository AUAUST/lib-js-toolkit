import { isArray } from "#modules/array/guards/isArray";

/**
 * Resolves `match`'s target, cases and fallback from its two call shapes:
 * `(cases, fallback?)` matches against `undefined`.
 */
export function resolveMatchArguments<Cases extends readonly unknown[]>(
  argumentCount: number,
  targetOrCases: unknown,
  casesOrFallback: unknown,
  fallback: unknown,
): [target: unknown, cases: Cases, fallback: unknown] {
  if (
    argumentCount <= 2 &&
    isArray(targetOrCases) &&
    !isArray(casesOrFallback)
  ) {
    // @debt Trusts the overloads for the cases' shape instead of validating them.
    return [undefined, targetOrCases as unknown as Cases, casesOrFallback];
  }

  // @debt Trusts the overloads for the cases' shape instead of validating them.
  return [targetOrCases, casesOrFallback as Cases, fallback];
}
