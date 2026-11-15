import { describe, expect, expectTypeOf, test } from "vitest";

import { pull } from "@auaust/toolkit/array";

describe("pull", () => {
  test("removes every NaN in place and returns them", () => {
    const array = [Number.NaN, 1, Number.NaN, 2];
    const removed = pull(array, Number.NaN);

    expect(removed).toEqual([Number.NaN, Number.NaN]);
    expect(array).toEqual([1, 2]);
    expectTypeOf(removed).toEqualTypeOf<number[]>();
  });

  test("removes several values and passes nullish through", () => {
    const array = ["a", "b", "c", "a"];

    expect(pull(array, "a", "c")).toEqual(["a", "c", "a"]);
    expect(array).toEqual(["b"]);
    expect(pull(null, 1)).toBeUndefined();
  });
});
