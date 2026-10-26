import { describe, expect, expectTypeOf, test } from "vitest";

import { ownKeys } from "@auaust/toolkit/object";

describe("ownKeys", () => {
  test("infers known keys", () => {
    const target = {
      value: 1,
      [Symbol("key")]: 2,
    };

    const result = ownKeys(target);

    expectTypeOf(result).toEqualTypeOf<("value" | symbol)[]>();
    expect(result).toContain("value");
    expect(ownKeys(undefined!)).toEqual([]);
  });
});
