/**
 * The type each type predicate of the union `Predicate` narrows its first argument
 * to, `never` for a predicate that does not narrow.
 */
export type Guarded<Predicate> = Predicate extends (
  candidate: any,
  ...args: any[]
) => candidate is infer Type
  ? Type
  : never;
