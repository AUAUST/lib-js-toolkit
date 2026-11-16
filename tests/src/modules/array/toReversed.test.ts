import { describe, expect, expectTypeOf, test } from "vitest";

import { toReversed } from "@auaust/toolkit/array";

describe("toReversed", () => {
  test("copies a readonly tuple into a writable reversed array", () => {
    const tuple = [1, "a"] as const;
    const result = toReversed(tuple);

    expect(result).toEqual(["a", 1]);
    expect(tuple).toEqual([1, "a"]);
    expectTypeOf(result).toEqualTypeOf<(1 | "a")[]>();
  });

  test("passes nullish through", () => {
    expect(toReversed(null)).toBeUndefined();
  });

  test("copies a generator's values reversed", () => {
    function* values() {
      yield 1;

      yield 2;

      yield 3;
    }

    const result = toReversed(values());

    expect(result).toEqual([3, 2, 1]);
    expectTypeOf(result).toEqualTypeOf<(1 | 2 | 3)[]>();
  });
});
