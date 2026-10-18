import type { RecordFromEntries } from "@auaust/toolkit/types";

export const record: {
  <const Entries extends Iterable<readonly [PropertyKey, unknown]>>(
    entries: Entries,
  ): RecordFromEntries<Entries>;
  (entries: Iterable<readonly any[]>): any;
} = Object.fromEntries;
