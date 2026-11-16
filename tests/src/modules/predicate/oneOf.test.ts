import { describe, expect, expectTypeOf, test } from "vitest";

import { oneOf } from "@auaust/toolkit/predicate";

describe("oneOf", () => {
  test("matches by SameValueZero", () => {
    expect(oneOf(1, NaN)(NaN)).toBe(true);
    expect(oneOf(1, NaN)(2)).toBe(false);
  });

  test("narrows to the given values", () => {
    const items: (string | number)[] = ["a", 1, "c", "b"];
    const filtered = items.filter(oneOf("a", "b"));

    expect(filtered).toEqual(["a", "b"]);
    expectTypeOf(filtered).toEqualTypeOf<("a" | "b")[]>();
  });
});
