import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Joined } from "#types/Joined";

/**
 * The result of `toDelimitedCase` for `Value` and `Delimiter`; `string` when
 * either is out of precision.
 */
export type DelimitedCased<
  Value extends string,
  Delimiter extends string,
> = Joined<SplitWords<Value>, Delimiter>;
