import type { LowercaseWords } from "#modules/string/types/LowercaseWords";
import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Joined } from "#types/Joined";

/**
 * The words of `Value`, split as `splitWords` splits them, lowercased and joined
 * with `Delimiter`; `string` when either is out of precision.
 */
export type LowercaseJoinedWords<
  Value extends string,
  Delimiter extends string,
> = Joined<LowercaseWords<SplitWords<Value>>, Delimiter>;
