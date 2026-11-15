import { describe, expect, expectTypeOf, test } from "vitest";

import { after, afterFirst } from "@auaust/toolkit/string";

describe("afterFirst", () => {
  test("returns the part after the first occurrence", () => {
    expect(afterFirst("a.b.c", ".")).toBe("b.c");
    expect(after).toBe(afterFirst);
    expectTypeOf(afterFirst("a.b", ".")).toEqualTypeOf<string | undefined>();
  });

  test("returns undefined for a missing needle", () => {
    expect(afterFirst("abc", ".")).toBeUndefined();
    expect(afterFirst(null, ".")).toBeNull();
  });
});
