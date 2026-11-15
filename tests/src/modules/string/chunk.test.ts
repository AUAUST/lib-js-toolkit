import { describe, expect, expectTypeOf, test } from "vitest";

import { chunk } from "@auaust/toolkit/string";

describe("chunk", () => {
  test("splits by code points", () => {
    expect(chunk("😀😀😀", 2)).toEqual(["😀😀", "😀"]);
    expectTypeOf(chunk("abc", 2)).toEqualTypeOf<string[]>();
  });

  test("throws a RangeError for an invalid size", () => {
    expect(() => chunk("a", 0)).toThrow(RangeError);
  });
});
