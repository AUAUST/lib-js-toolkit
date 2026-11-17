import { describe, expect, expectTypeOf, test } from "vitest";

import { splitFirst } from "@auaust/toolkit/string";

describe("splitFirst", () => {
  test("splits around the first occurrence", () => {
    expect(splitFirst("hello,world", ",")).toEqual(["hello", "world"]);
    expect(splitFirst("hello,", ",")).toEqual(["hello", ""]);

    expectTypeOf(splitFirst("a.b", ".")).toEqualTypeOf<
      [string, string | undefined]
    >();
  });

  test("returns undefined after the string for a missing needle", () => {
    expect(splitFirst("hello", ",")).toEqual(["hello", undefined]);
    expect(splitFirst(null, ".")).toBeUndefined();
  });
});
