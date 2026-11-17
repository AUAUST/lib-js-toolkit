import type { CapitalizedJoinedWords } from "#modules/string/types/CapitalizedJoinedWords";

/**
 * The result of `toPascalCase` for `Value`; `string` when `Value` is
 * out of precision.
 */
export type PascalCased<Value extends string> = CapitalizedJoinedWords<
  Value,
  ""
>;
