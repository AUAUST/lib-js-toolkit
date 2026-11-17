/**
 * Each word of `Words` lowercased, as the case converters lowercase them.
 */
export type LowercaseWords<Words extends readonly string[]> = {
  [Index in keyof Words]: Lowercase<Words[Index]>;
};
