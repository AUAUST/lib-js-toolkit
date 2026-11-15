import { describe, expect, expectTypeOf, test } from "vitest";

import { splitFirst } from "@auaust/toolkit/string";

describe("splitFirst", () => {
  test("splits around the first occurrence", () => {
    expect(splitFirst("a.b.c", ".")).toEqual(["a", "b.c"]);
    expectTypeOf(splitFirst("a.b", ".")).toEqualTypeOf<[string, string]>();
  });

  test("returns the string and an empty string for a missing needle", () => {
    expect(splitFirst("abc", ".")).toEqual(["abc", ""]);
    expect(splitFirst(null, ".")).toBeNull();
  });
});
