import type { LowercaseJoinedWords } from "#modules/string/types/LowercaseJoinedWords";

/**
 * The result of `toSlug` for `Value`; `string` when `Value` is out of precision.
 */
export type Slugged<Value extends string> = LowercaseJoinedWords<Value, "-">;
