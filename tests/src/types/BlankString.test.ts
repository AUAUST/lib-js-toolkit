import { describe, expectTypeOf, test } from "vitest";

import type { BlankString, Whitespace } from "@auaust/toolkit/types";

describe("BlankString", () => {
  test("extracts blank string literals", () => {
    expectTypeOf<
      BlankString<"" | " " | "\t\n" | "hello" | " hello ">
    >().toEqualTypeOf<"" | " " | "\t\n">();

    expectTypeOf<BlankString<"\u00a0\ufeff">>().toEqualTypeOf<"\u00a0\ufeff">();
    expectTypeOf<BlankString<"\u200b">>().toBeNever();
    expectTypeOf<BlankString<never>>().toBeNever();
  });

  test("retains possible blanks in broad string types", () => {
    expectTypeOf<BlankString>().toEqualTypeOf<"" | `${Whitespace}${string}`>();
    expectTypeOf<BlankString<`hello${string}`>>().toBeNever();

    expectTypeOf<BlankString<` ${string}`>>().toEqualTypeOf<
      " " | ` ${Whitespace}${string}`
    >();

    expectTypeOf<BlankString<`${number}`>>().toBeNever();
  });
});
