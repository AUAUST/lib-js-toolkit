/**
 * Resolves to `IfTrue` when `Value` and `Target` are the same type, mutually
 * identical rather than only assignable, and to `IfFalse` otherwise.
 */
export type Is<
  Value,
  Target,
  IfTrue = true,
  IfFalse = IfTrue extends true ? false : never,
> = (<G>() => G extends Value ? 1 : 2) extends <G>() => G extends Target ? 1 : 2
  ? IfTrue
  : IfFalse;
