import type { RecordFromEntries } from "#types/RecordFromEntries";

/**
 * `Object.fromEntries`: builds an object from key-value entries, the last
 * duplicate key winning, typed with literal keys and values.
 *
 * @shorthand record
 * @native equal Object.fromEntries
 */
export const fromEntries: {
  <const Entries extends Iterable<readonly [PropertyKey, unknown]>>(
    entries: Entries,
  ): RecordFromEntries<Entries>;
  (entries: Iterable<readonly any[]>): any;
} = Object.fromEntries;
