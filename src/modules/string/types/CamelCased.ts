import type { CamelCasedWords } from "#modules/string/types/CamelCasedWords";
import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Joined } from "#types/Joined";

/**
 * The result of `toCamelCase` for `Value`; `string` when `Value` is
 * out of precision.
 */
export type CamelCased<Value extends string> = Joined<
  CamelCasedWords<SplitWords<Value>>,
  ""
>;
