import { describe, expect, expectTypeOf, test } from "vitest";

import { before, beforeFirst } from "@auaust/toolkit/string";

describe("beforeFirst", () => {
  test("returns the part before the first occurrence", () => {
    expect(beforeFirst("a.b.c", ".")).toBe("a");
    expect(before).toBe(beforeFirst);
    expectTypeOf(beforeFirst("a.b", ".")).toEqualTypeOf<string | undefined>();
  });

  test("returns undefined for a missing needle", () => {
    expect(beforeFirst("abc", ".")).toBeUndefined();
    expect(beforeFirst(null, ".")).toBeNull();
  });
});
