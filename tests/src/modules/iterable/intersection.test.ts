import { describe, expect, expectTypeOf, test } from "vitest";

import { intersection } from "@auaust/toolkit/iterable";

describe("intersection", () => {
  test("keeps the first input's order and duplicates", () => {
    const result = intersection([3, 1, NaN, 3, 2], [NaN, 3]);

    expect([...result]).toEqual([3, NaN, 3]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<number, undefined>>();
  });

  test("reads a set-like through has", () => {
    expect([...intersection([1, 2, 2, 3], new Set([2]))]).toEqual([2, 2]);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    expect(() => intersection([1], 42 as never)).toThrow(TypeError);
    expect(intersection(null, [])).toBeUndefined();
  });
});
