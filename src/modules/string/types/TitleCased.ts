import type { CapitalizedJoinedWords } from "#modules/string/types/CapitalizedJoinedWords";

/**
 * The result of `toTitleCase` for `Value`; `string` when `Value` is
 * out of precision.
 */
export type TitleCased<Value extends string> = CapitalizedJoinedWords<
  Value,
  " "
>;
