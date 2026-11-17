import { describe, expect, expectTypeOf, test } from "vitest";

import { splitLast } from "@auaust/toolkit/string";

describe("splitLast", () => {
  test("splits around the last occurrence", () => {
    expect(splitLast("hello,world", ",")).toEqual(["hello", "world"]);
    expect(splitLast(",world", ",")).toEqual(["", "world"]);

    expectTypeOf(splitLast("a.b", ".")).toEqualTypeOf<
      [string | undefined, string]
    >();
  });

  test("returns undefined before the string for a missing needle", () => {
    expect(splitLast("world", ",")).toEqual([undefined, "world"]);
    expect(splitLast(null, ",")).toBeUndefined();
  });
});
