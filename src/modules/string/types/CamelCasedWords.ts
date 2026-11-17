import type { CapitalizedWords } from "#modules/string/types/CapitalizedWords";

/**
 * The words of `Words` as `toCamelCase` cases them: the first lowercased,
 * the others capitalized.
 */
export type CamelCasedWords<
  Words extends readonly string[],
> = Words extends readonly [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? [Lowercase<First>, ...CapitalizedWords<Rest>]
  : Words extends readonly []
    ? []
    : string[];
