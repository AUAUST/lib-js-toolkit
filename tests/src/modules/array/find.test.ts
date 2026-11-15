import { describe, expect, expectTypeOf, test } from "vitest";

import { find } from "@auaust/toolkit/array";
import { isString } from "@auaust/toolkit/guard";

describe("find", () => {
  test("returns the first accepted item, passing each index", () => {
    expect(
      find([1, 2, 3], (value, index) => {
        return value > 1 && index > 0;
      }),
    ).toBe(2);

    expect(find([1], (value) => value > 1)).toBeUndefined();
  });

  test("narrows with a type predicate and accepts readonly arrays", () => {
    const result = find([1, "a"], isString);

    expect(result).toBe("a");
    expectTypeOf(result).toEqualTypeOf<string | undefined>();

    expectTypeOf(find([1, "a"] as const, isString)).toEqualTypeOf<
      "a" | undefined
    >();

    expectTypeOf(find([1, 2] as const, Boolean)).toEqualTypeOf<
      1 | 2 | undefined
    >();
  });

  test("returns the first item whose named member is truthy", () => {
    const items = [
      { active: false, id: 1 },
      { active: true, id: 2 },
    ];

    expect(find(items, "active")).toBe(items[1]);

    const union: ({ id: number } | { id: number; active: boolean })[] = [];

    // @ts-expect-error `active` is missing from one member of the union
    find(union, "active");
  });

  test("passes nullish through and rejects invalid predicates", () => {
    expect(find(null, Boolean)).toBeUndefined();
    expect(() => find([1], true as never)).toThrow(TypeError);
  });
});
