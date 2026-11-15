import type { Callee } from "#types/Callee";

// @debt The per-member check duplicates the one in `MethodName` with another function shape; a shared helper type would own it.
type MemberHoldsNullaryMethod<
  Target,
  Name extends keyof Target,
> = Target extends unknown
  ? [Exclude<Target[Name], undefined>] extends [never]
    ? false
    : [Exclude<Target[Name], undefined>] extends [Callee<any, []>]
      ? true
      : false
  : never;

/**
 * Returns the names of all methods of the given type that take no arguments at
 * all, that only have optional arguments or that take a single rest parameter.
 * A union counts a name only when every member holds such a method under it.
 */
export type NullaryMethodName<Target> = keyof Target extends infer Name
  ? Name extends keyof Target
    ? [MemberHoldsNullaryMethod<Target, Name>] extends [true]
      ? Name
      : never
    : never
  : never;
