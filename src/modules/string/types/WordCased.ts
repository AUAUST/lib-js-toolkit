/**
 * The result of `toWordCase` for `Value`, capitalized when `Capitalized` is
 * `true`; `string` when `Value` is out of precision.
 */
export type WordCased<
  Value extends string,
  Capitalized extends boolean = false,
> = string extends Value
  ? string
  : Capitalized extends true
    ? Capitalize<Lowercase<Value>>
    : Lowercase<Value>;
