import { describe, expect, expectTypeOf, test } from "vitest";

import { nthIndexOf } from "@auaust/toolkit/string";

describe("nthIndexOf", () => {
  test("finds occurrences from the start and from the end", () => {
    expect(nthIndexOf("a.b.c", ".", 0)).toBe(1);
    expect(nthIndexOf("a.b.c", ".", -1)).toBe(3);
    expect(nthIndexOf("ab", "a", -2)).toBe(-1);
    expectTypeOf(nthIndexOf("a.b.c", ".", 0)).toEqualTypeOf<number>();
  });

  test("returns -1 for a missing occurrence", () => {
    expect(nthIndexOf("a.b.c", ".", 2)).toBe(-1);
    expect(nthIndexOf("ab", "", 3)).toBe(-1);
  });

  test("throws a RangeError for a non-integer position", () => {
    expect(() => nthIndexOf("a.b.c", ".", 1.5)).toThrow(RangeError);
  });

  test("returns undefined for nullish input", () => {
    expect(nthIndexOf(null, ".", 0)).toBeUndefined();
  });
});
