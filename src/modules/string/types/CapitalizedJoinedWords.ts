import type { CapitalizedWords } from "#modules/string/types/CapitalizedWords";
import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Joined } from "#types/Joined";

/**
 * The words of `Value`, split as `splitWords` splits them, capitalized and joined
 * with `Delimiter`; `string` when either is out of precision.
 */
export type CapitalizedJoinedWords<
  Value extends string,
  Delimiter extends string,
> = Joined<CapitalizedWords<SplitWords<Value>>, Delimiter>;
