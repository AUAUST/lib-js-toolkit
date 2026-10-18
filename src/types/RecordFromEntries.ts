import type { Assigned, IfAny, ToRecordKey } from "@auaust/toolkit/types";

type EntryRecord<Entry> = Entry extends readonly [PropertyKey, unknown]
  ? {
      [Key in Entry[0] as ToRecordKey<Key>]: Entry[1];
    }
  : never;

type EntryValue<Entry, Key extends PropertyKey> = Entry extends readonly [
  infer EntryKey,
  infer Value,
]
  ? Key extends EntryKey
    ? Value
    : never
  : never;

export type RecordFromEntries<
  Entries extends Iterable<readonly [PropertyKey, unknown]>,
> = IfAny<
  Entries,
  any,
  Entries extends readonly [
    infer First extends readonly [PropertyKey, unknown],
    ...infer Rest extends readonly (readonly [PropertyKey, unknown])[],
  ]
    ? Assigned<EntryRecord<First>, [RecordFromEntries<Rest>]>
    : Entries extends readonly []
      ? {}
      : Entries extends Iterable<
            infer Entry extends readonly [PropertyKey, unknown]
          >
        ? {
            [Key in Entry[0] as ToRecordKey<Key>]: EntryValue<Entry, Key>;
          }
        : never
>;
