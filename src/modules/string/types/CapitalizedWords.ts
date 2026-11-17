/**
 * Each word of `Words` lowercased then capitalized, as the case converters
 * capitalize them.
 */
export type CapitalizedWords<Words extends readonly string[]> = {
  [Index in keyof Words]: Capitalize<Lowercase<Words[Index]>>;
};
