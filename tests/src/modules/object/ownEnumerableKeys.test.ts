import { describe, expect, expectTypeOf, test } from "vitest";

import { ownEnumerableKeys } from "@auaust/toolkit/object";

describe("ownEnumerableKeys", () => {
  test("lists own enumerable string and symbol keys only", () => {
    const key = Symbol("key");

    const target = Object.create(
      {
        inherited: 1,
      },
      {
        hidden: { value: 1, enumerable: false },
      },
    ) as { a: number; [key]: number };

    target.a = 1;
    target[key] = 2;

    const result = ownEnumerableKeys(target);

    expect(result).toEqual(["a", key]);
    expectTypeOf(result).toEqualTypeOf<("a" | typeof key)[]>();
  });
});
