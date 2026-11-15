import { describe, expect, expectTypeOf, test } from "vitest";

import { pullBy } from "@auaust/toolkit/array";

describe("pullBy", () => {
  test("removes accepted items in place and returns them", () => {
    const array = [1, 2, 3, 4];
    const removed = pullBy(array, (value) => value % 2 === 0);

    expect(removed).toEqual([2, 4]);
    expect(array).toEqual([1, 3]);
    expectTypeOf(removed).toEqualTypeOf<number[]>();
  });

  test("returns [] and leaves the array unchanged when nothing is accepted", () => {
    const array = [1, 2];

    expect(pullBy(array, () => false)).toEqual([]);
    expect(array).toEqual([1, 2]);
  });

  test("throws on a non-function predicate", () => {
    // @ts-expect-error -- a predicate must be a function
    expect(() => pullBy([1], "x")).toThrow(TypeError);
  });
});
