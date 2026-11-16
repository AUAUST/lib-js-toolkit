import { describe, expect, expectTypeOf, test } from "vitest";

import { toDeduplicated } from "@auaust/toolkit/array";

describe("toDeduplicated", () => {
  test("copies first occurrences and leaves the input unchanged", () => {
    const array = [1, NaN, 1, NaN];
    const result = toDeduplicated(array);

    expect(result).toEqual([1, NaN]);
    expect(array).toEqual([1, NaN, 1, NaN]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("passes nullish through", () => {
    expect(toDeduplicated(null)).toBeUndefined();
  });

  test("copies the distinct values of any iterable but a string", () => {
    expect(
      toDeduplicated(
        new Map([
          [1, 1],
          [2, 1],
        ]).values(),
      ),
    ).toEqual([1]);
  });
});
