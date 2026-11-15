import { describe, expect, expectTypeOf, test } from "vitest";

import { flatMap } from "@auaust/toolkit/array";
import type { Maybe } from "@auaust/toolkit/types";

describe("flatMap", () => {
  test("flattens array results by one level into a new array", () => {
    const result = flatMap([1, 2] as const, (value, index) => {
      return index === 0 ? [value, [value]] : value;
    });

    expect(result).toEqual([1, [1], 2]);
    expectTypeOf(result).toEqualTypeOf<(1 | 2 | (1 | 2)[])[]>();
  });

  test("keeps string and other iterable results as items", () => {
    expect(flatMap(["ab"], (value) => value)).toEqual(["ab"]);

    expect(
      flatMap([1], () => {
        return new Set([1]);
      }),
    ).toEqual([new Set([1])]);
  });

  test("passes nullish through and rejects invalid mappers", () => {
    expect(flatMap(null, () => [])).toBeUndefined();
    expect(() => flatMap([1], true as never)).toThrow(TypeError);

    expectTypeOf(
      flatMap([1] as Maybe<number[]>, (value) => {
        return [String(value)];
      }),
    ).toEqualTypeOf<string[] | undefined>();
  });
});
