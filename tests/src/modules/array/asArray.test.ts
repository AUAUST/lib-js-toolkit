import { describe, expect, expectTypeOf, test } from "vitest";

import { asArray } from "@auaust/toolkit/array";

describe("asArray", () => {
  test("returns an array subject itself", () => {
    const array = [1, "a"] as const;
    const result = asArray(array);

    expect(result).toBe(array);
    expectTypeOf(result).toEqualTypeOf<readonly [1, "a"]>();
  });

  test("copies other iterables", () => {
    const result = asArray(new Set([1]));

    expect(result).toEqual([1]);
    expectTypeOf(result).toEqualTypeOf<readonly number[]>();
  });

  test("throws on strings", () => {
    // @ts-expect-error A string is not accepted.
    expect(() => asArray("ab")).toThrow(TypeError);
  });
});
