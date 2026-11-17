type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type LowerLetter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

type UpperLetter = Uppercase<LowerLetter>;

type Apostrophe = "'" | "’";

type Separator =
  | " "
  | "\t"
  | "\n"
  | "\r"
  | "\v"
  | "\f"
  | "!"
  | '"'
  | "#"
  | "$"
  | "%"
  | "&"
  | "("
  | ")"
  | "*"
  | "+"
  | ","
  | "-"
  | "."
  | "/"
  | ":"
  | ";"
  | "<"
  | "="
  | ">"
  | "?"
  | "@"
  | "["
  | "\\"
  | "]"
  | "^"
  | "_"
  | "`"
  | "{"
  | "|"
  | "}"
  | "~";

type InPrecision<
  Input extends string,
> = Input extends `${infer Char}${infer Rest}`
  ? Char extends Digit | LowerLetter | UpperLetter | Apostrophe | Separator
    ? InPrecision<Rest>
    : false
  : Input extends ""
    ? true
    : false;

type WithoutApostrophes<
  Input extends string,
  Kept extends string = "",
> = Input extends `${infer Char}${infer Rest}`
  ? WithoutApostrophes<Rest, Char extends Apostrophe ? Kept : `${Kept}${Char}`>
  : Kept;

type Pushed<Words extends string[], Word extends string> = Word extends ""
  ? Words
  : [...Words, Word];

type IsBoundary<
  Previous extends string,
  Char extends string,
  Rest extends string,
> = [Previous, Char] extends [LowerLetter, UpperLetter]
  ? true
  : [Previous, Char] extends [UpperLetter, UpperLetter]
    ? Rest extends `${LowerLetter}${string}`
      ? true
      : false
    : [Previous, Char] extends [Digit, Exclude<Char, Digit>]
      ? true
      : [Previous, Char] extends [Exclude<Previous, Digit>, Digit]
        ? true
        : false;

type SplitAscii<
  Input extends string,
  Previous extends string = "",
  Word extends string = "",
  Words extends string[] = [],
> = Input extends `${infer Char}${infer Rest}`
  ? Char extends Separator
    ? SplitAscii<Rest, Char, "", Pushed<Words, Word>>
    : IsBoundary<Previous, Char, Rest> extends true
      ? SplitAscii<Rest, Char, Char, Pushed<Words, Word>>
      : SplitAscii<Rest, Char, `${Word}${Char}`, Words>
  : Pushed<Words, Word>;

/**
 * The words `splitWords` returns for `Input`: a tuple for a literal made only
 * of ASCII letters, digits, apostrophes and ASCII separators, `string[]`
 * for any other string.
 */
export type SplitWords<Input extends string> = Input extends string
  ? string extends Input
    ? string[]
    : InPrecision<Input> extends true
      ? SplitAscii<WithoutApostrophes<Input>>
      : string[]
  : never;
