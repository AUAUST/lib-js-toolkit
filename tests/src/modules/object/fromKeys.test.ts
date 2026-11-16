import { describe, expect, expectTypeOf, test } from "vitest";

import { fromKeys } from "@auaust/toolkit/object";

describe("fromKeys", () => {
  test("stores the resolver's result under each key", () => {
    const result = fromKeys(["a", "b"], (key) => key.length);

    expect(result).toEqual({ a: 1, b: 1 });
    expectTypeOf(result).toEqualTypeOf<{ a: number; b: number }>();
  });

  test("keeps the last result for a repeated key", () => {
    let calls = 0;

    expect(
      fromKeys(["a", "a"], () => {
        return ++calls;
      }),
    ).toEqual({ a: 2 });
  });
});
