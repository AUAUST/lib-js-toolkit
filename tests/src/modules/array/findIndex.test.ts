import { describe, expect, expectTypeOf, test } from "vitest";

import { findIndex } from "@auaust/toolkit/array";

describe("findIndex", () => {
  test("returns the index of the accepted item, or -1", () => {
    expect(findIndex([1, 2, 3], (value) => value < 3)).toBe(0);
    expect(findIndex([1], (value) => value > 1)).toBe(-1);
  });

  test("accepts a property name and passes nullish through", () => {
    expect(findIndex([{ on: true }, { on: true }], "on")).toBe(0);
    expect(findIndex(null, Boolean)).toBeUndefined();
    expect(() => findIndex([1], true as never)).toThrow(TypeError);
    expectTypeOf(findIndex([1], Boolean)).toEqualTypeOf<number>();
  });
});
