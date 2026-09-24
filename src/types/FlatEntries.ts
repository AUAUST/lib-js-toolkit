export type FlatEntries<T extends any[]> = T extends infer U
  ? U extends (infer Entry)[]
    ? (Entry extends (infer Inner)[] ? Inner : Entry)[]
    : never
  : never;
