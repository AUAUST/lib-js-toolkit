import { describe, expect, expectTypeOf, test } from "vitest";

import { toCollapsed } from "@auaust/toolkit/array";

describe("toCollapsed", () => {
  test("copies without holes", () => {
    const sparse = [1];

    sparse[2] = 2;

    const result = toCollapsed(sparse);

    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(sparse);
    expect(sparse).toHaveLength(3);
    expectTypeOf(toCollapsed([1, "a"] as const)).toEqualTypeOf<(1 | "a")[]>();
  });

  test("passes nullish through", () => {
    expect(toCollapsed(null)).toBeUndefined();
  });

  test("copies any iterable but a string", () => {
    expect(toCollapsed(new Set([1, 2]))).toEqual([1, 2]);
  });
});
