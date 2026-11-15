import { describe, expect, expectTypeOf, test } from "vitest";

import { reverse } from "@auaust/toolkit/array";

describe("reverse", () => {
  test("reverses in place and returns its input", () => {
    const array = [1, 2, 3];
    const result = reverse(array);

    expect(result).toBe(array);
    expect(result).toEqual([3, 2, 1]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("passes nullish through", () => {
    expect(reverse(undefined)).toBeUndefined();
  });
});
