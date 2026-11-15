import { describe, expect, expectTypeOf, test } from "vitest";

import { findLast } from "@auaust/toolkit/array";
import { isString } from "@auaust/toolkit/guard";

describe("findLast", () => {
  test("returns the last accepted item, narrowing with a type predicate", () => {
    expect(findLast([1, 2, 3], (value) => value < 3)).toBe(2);

    const result = findLast([1, "a", "b"], isString);

    expect(result).toBe("b");
    expectTypeOf(result).toEqualTypeOf<string | undefined>();
  });

  test("accepts a property name and passes nullish through", () => {
    const items = [{ on: true }, { on: true }, { on: false }];

    expect(findLast(items, "on")).toBe(items[1]);
    expect(findLast(null, Boolean)).toBeUndefined();
    expect(() => findLast([1], true as never)).toThrow(TypeError);
  });
});
