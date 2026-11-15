import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { every } from "@auaust/toolkit/array";
import { isString } from "@auaust/toolkit/guard";

describe("every", () => {
  test("stops at the first rejected item", () => {
    const predicate = vi.fn((value: number) => value > 1);

    expect(every([1, 2], predicate)).toBe(false);
    expect(predicate).toHaveBeenCalledTimes(1);
    expect(every([], () => false)).toBe(true);
  });

  test("narrows the array with a type predicate", () => {
    const values: (number | string)[] = ["a", "b"];

    expect(every(values, isString)).toBe(true);

    if (every(values, isString)) {
      expectTypeOf(values).toExtend<readonly string[]>();
    }
  });

  test("accepts a property name", () => {
    expect(every([{ on: true }, { on: 1 }], "on")).toBe(true);
    expect(every([{ on: true }, { on: 0 }], "on")).toBe(false);
  });

  test("passes nullish through and rejects invalid predicates", () => {
    expect(every(null, Boolean)).toBeUndefined();
    expect(() => every([1], true as never)).toThrow(TypeError);
  });
});
