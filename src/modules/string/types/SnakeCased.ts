import type { LowercaseJoinedWords } from "#modules/string/types/LowercaseJoinedWords";

/**
 * The result of `toSnakeCase` for `Value`; `string` when `Value` is
 * out of precision.
 */
export type SnakeCased<Value extends string> = LowercaseJoinedWords<Value, "_">;
