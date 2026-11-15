import { describe, expect, expectTypeOf, test } from "vitest";

import { random } from "@auaust/toolkit/array";

describe("random", () => {
  test("returns one of the items", () => {
    const tuple = [1, "a", true] as const;
    const result = random(tuple);

    expect(tuple).toContain(result);
    expectTypeOf(result).toEqualTypeOf<1 | "a" | true>();
  });

  test("throws a RangeError on an empty array", () => {
    expect(() => random([])).toThrow(RangeError);
  });

  test("passes nullish through", () => {
    expect(random(undefined)).toBeUndefined();
  });
});
