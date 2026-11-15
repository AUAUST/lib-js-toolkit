import type { Callee } from "#types/Callee";

type MemberHoldsMethod<
  Target,
  Name extends keyof Target,
> = Target extends unknown
  ? [Exclude<Target[Name], undefined>] extends [never]
    ? false
    : [Exclude<Target[Name], undefined>] extends [Callee]
      ? true
      : false
  : never;

/**
 * Returns the names of all methods of the given type, primitives and arrays
 * included. A union counts a name only when every member holds a method under it.
 */
export type MethodName<Target> = keyof Target extends infer Name
  ? Name extends keyof Target
    ? [MemberHoldsMethod<Target, Name>] extends [true]
      ? Name
      : never
    : never
  : never;
