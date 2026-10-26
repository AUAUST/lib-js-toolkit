import { describe, expectTypeOf, test } from "vitest";

import type { EmptyString, Whitespace } from "@auaust/toolkit/types";

describe("EmptyString", () => {
  test("extracts blank string literals", () => {
    expectTypeOf<
      EmptyString<"" | " " | "\t\n" | "hello" | " hello ">
    >().toEqualTypeOf<"" | " " | "\t\n">();
    expectTypeOf<EmptyString<"\u00a0\ufeff">>().toEqualTypeOf<"\u00a0\ufeff">();
    expectTypeOf<EmptyString<"\u200b">>().toBeNever();
    expectTypeOf<EmptyString<never>>().toBeNever();
  });

  test("retains possible blanks in broad string types", () => {
    expectTypeOf<EmptyString>().toEqualTypeOf<"" | `${Whitespace}${string}`>();
    expectTypeOf<EmptyString<`hello${string}`>>().toBeNever();
    expectTypeOf<EmptyString<` ${string}`>>().toEqualTypeOf<
      " " | ` ${Whitespace}${string}`
    >();
    expectTypeOf<EmptyString<`${number}`>>().toBeNever();
  });
});
