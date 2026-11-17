import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Joined } from "#types/Joined";

/**
 * The result of `toConstantCase` for `Value`; `string` when `Value` is
 * out of precision.
 */
export type ConstantCased<Value extends string> = string extends Value
  ? string
  : Uppercase<Joined<SplitWords<Value>, "_">>;
