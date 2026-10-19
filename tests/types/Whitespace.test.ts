import type { Whitespace } from "@auaust/toolkit/types";
import { expect, expectTypeOf, test } from "vitest";

test("Whitespace represents the characters removed by trim", () => {
  const whitespace =
    " \t\n\r\v\f\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff";

  expect(whitespace.trim()).toBe("");

  expectTypeOf<Extract<Whitespace, " " | "\t" | "\n">>().toEqualTypeOf<
    " " | "\t" | "\n"
  >();

  expectTypeOf<Extract<Whitespace, "" | "a" | "\u200b">>().toBeNever();
});
