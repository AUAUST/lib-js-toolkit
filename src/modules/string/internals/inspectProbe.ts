/**
 * Applies a built-in method or getter to the target, returning its result wrapped,
 * or `false` when it is missing or throws (a failed brand check).
 */
export function inspectProbe(
  method: ((...args: never[]) => unknown) | undefined,
  target: object,
  args: readonly unknown[] = [],
): false | { readonly result: unknown } {
  if (!method) {
    return false;
  }

  try {
    return { result: Reflect.apply(method, target, args) };
  } catch {
    return false;
  }
}
