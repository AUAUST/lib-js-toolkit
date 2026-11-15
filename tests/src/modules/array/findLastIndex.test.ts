import { describe, expect, expectTypeOf, test } from "vitest";

import { findLastIndex } from "@auaust/toolkit/array";

describe("findLastIndex", () => {
  test("returns the index of the accepted item, or -1", () => {
    expect(findLastIndex([1, 2, 3], (value) => value < 3)).toBe(1);
    expect(findLastIndex([1], (value) => value > 1)).toBe(-1);
  });

  test("accepts a property name and passes nullish through", () => {
    expect(findLastIndex([{ on: true }, { on: true }], "on")).toBe(1);
    expect(findLastIndex(null, Boolean)).toBeUndefined();
    expect(() => findLastIndex([1], true as never)).toThrow(TypeError);
    expectTypeOf(findLastIndex([1], Boolean)).toEqualTypeOf<number>();
  });
});
