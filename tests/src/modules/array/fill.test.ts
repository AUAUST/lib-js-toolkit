import { describe, expect, expectTypeOf, test } from "vitest";

import { fill } from "@auaust/toolkit/array";

describe("fill", () => {
  test("fills a range in place and returns its input", () => {
    const array = [1, 2, 3, 4];
    const result = fill(array, 0, 1, -1);

    expect(result).toBe(array);
    expect(result).toEqual([1, 0, 0, 4]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("passes nullish through", () => {
    expect(fill(undefined, 0)).toBeUndefined();
  });
});
