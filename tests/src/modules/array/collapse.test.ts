import { describe, expect, expectTypeOf, test } from "vitest";

import { collapse } from "@auaust/toolkit/array";

describe("collapse", () => {
  test("removes holes in place and returns its input", () => {
    const array = [1];

    array[2] = 3;

    const result = collapse(array);

    expect(result).toBe(array);
    expect(result).toEqual([1, 3]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("passes nullish through", () => {
    expect(collapse(undefined)).toBeUndefined();
  });
});
