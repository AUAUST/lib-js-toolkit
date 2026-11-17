import type { LowercaseJoinedWords } from "#modules/string/types/LowercaseJoinedWords";

/**
 * The result of `toKebabCase` for `Value`; `string` when `Value` is
 * out of precision.
 */
export type KebabCased<Value extends string> = LowercaseJoinedWords<Value, "-">;
