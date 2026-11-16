import type { IsStringLiteral } from "#types/IsStringLiteral";

type IsUnion<Type, Whole = Type> = Type extends unknown
  ? [Whole] extends [Type]
    ? false
    : true
  : never;

type SplitChars<Input extends string> = Input extends ""
  ? []
  : Input extends `${infer Char}${infer Rest}`
    ? [Char, ...SplitChars<Rest>]
    : string[];

type SplitParts<
  Input extends string,
  Separator extends string,
> = Input extends `${infer Head}${Separator}${infer Tail}`
  ? [Head, ...SplitParts<Tail, Separator>]
  : [Input];

/**
 * The parts a literal string splits into around a literal separator, as
 * `String.prototype.split` without a limit; a wide or template literal string, or
 * a wide, template literal or union separator, widens the result to `string[]`.
 */
export type Split<Input extends string, Separator extends string> = [
  IsStringLiteral<Input>,
] extends [true]
  ? [IsStringLiteral<Separator>] extends [true]
    ? true extends IsUnion<Separator>
      ? string[]
      : Separator extends ""
        ? SplitChars<Input>
        : SplitParts<Input, Separator>
    : string[]
  : string[];
