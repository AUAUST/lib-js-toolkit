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
});
