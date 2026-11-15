export type NonEmptyString<Value extends string = string> = Value extends ""
  ? never
  : Value;
