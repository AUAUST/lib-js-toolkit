/**
 * Removes `readonly` from the top-level properties of `T`. Shallow: nested members
 * keep their modifiers. Arrays and tuples stay arrays and tuples, made mutable.
 */
export type Writable<T> = { -readonly [Key in keyof T]: T[Key] };
