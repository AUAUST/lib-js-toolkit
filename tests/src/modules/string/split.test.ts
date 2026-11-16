import { describe, expect, expectTypeOf, test } from "vitest";

import { split } from "@auaust/toolkit/string";

describe("split", () => {
  test("splits a literal into a tuple of literal parts", () => {
    expect(split("a,b", ",")).toEqual(["a", "b"]);
    expectTypeOf(split("a,b", ",")).toEqualTypeOf<["a", "b"]>();
  });

  test("returns native results for a RegExp separator or a limit", () => {
    expect(split("a1b2c", /\d/)).toEqual(["a", "b", "c"]);
    expect(split("a,b,c", ",", 2)).toEqual(["a", "b"]);
    expectTypeOf(split("a1b", /\d/)).toEqualTypeOf<string[]>();
    expectTypeOf(split("a,b", ",", 2)).toEqualTypeOf<string[]>();
  });

  test("widens template literal strings and separators", () => {
    const input: `a,${string}` = "a,b,c";
    const separator: `,${string}` = ",";

    expect(split(input, ",")).toEqual(["a", "b", "c"]);
    expectTypeOf(split(input, ",")).toEqualTypeOf<string[]>();
    expectTypeOf(split("a,b", separator)).toEqualTypeOf<string[]>();
  });

  test("handles nullish and empty strings", () => {
    expect(split(null, ",")).toBeUndefined();
    expect(split("", ",")).toEqual([""]);
    expectTypeOf(split("", ",")).toEqualTypeOf<[""]>();
  });
});
