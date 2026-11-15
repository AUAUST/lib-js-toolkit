/**
 * The object `Object(input)` gives: the wrapper of a primitive, `{}` for nullish
 * values, the input itself otherwise.
 */
export type ToObject<Input> = Input extends null | undefined
  ? {}
  : Input extends boolean
    ? BooleanConstructor["prototype"]
    : Input extends number
      ? NumberConstructor["prototype"]
      : Input extends string
        ? StringConstructor["prototype"]
        : Input extends bigint
          ? BigIntConstructor["prototype"]
          : Input extends symbol
            ? SymbolConstructor["prototype"]
            : Input;
