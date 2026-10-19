export type EmptyContainer<Value> = Value extends readonly unknown[]
  ? 0 extends Value["length"]
    ? Value extends unknown[]
      ? []
      : readonly []
    : never
  : Value extends ReadonlyMap<infer Key, unknown>
    ? Value extends Map<unknown, unknown>
      ? Map<Key, never>
      : ReadonlyMap<Key, never>
    : Value extends ReadonlySet<unknown>
      ? Value extends Set<unknown>
        ? Set<never>
        : ReadonlySet<never>
      : Value extends (...args: any[]) => any
        ? never
        : Value extends { length: number }
          ? { length: 0 }
          : Value extends { size: number }
            ? { size: 0 }
            : Record<string, never>;
