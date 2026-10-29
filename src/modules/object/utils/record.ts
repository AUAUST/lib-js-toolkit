import type { RecordFromEntries } from "#types/RecordFromEntries";

export const record: {
  <const Entries extends Iterable<readonly [PropertyKey, unknown]>>(
    entries: Entries,
  ): RecordFromEntries<Entries>;
  (entries: Iterable<readonly any[]>): any;
} = Object.fromEntries;
