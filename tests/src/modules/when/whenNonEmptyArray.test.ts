import { describe, expect, expectTypeOf, test } from "vitest";

import { whenNonEmptyArray } from "@auaust/toolkit";

describe("whenNonEmptyArray", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenNonEmptyArray([1], true, false)).toBe(true);
    expect(whenNonEmptyArray([], true, false)).toBe(false);
  });

  test("narrows the branch types as the guard does", () => {
    const numbers = [1] as number[];

    whenNonEmptyArray(
      numbers,
      (value) => expectTypeOf(value).toEqualTypeOf<[number, ...number[]]>(),
      (value) => expectTypeOf(value).toEqualTypeOf<number[]>(),
    );

    const strings = ["a"] as readonly string[];

    whenNonEmptyArray(strings, (value) => {
      return expectTypeOf(value).toEqualTypeOf<
        readonly [string, ...string[]]
      >();
    });
  });
});
