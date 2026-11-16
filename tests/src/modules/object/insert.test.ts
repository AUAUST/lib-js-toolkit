import { describe, expect, expectTypeOf, test } from "vitest";

import { insert } from "@auaust/toolkit/object";

describe("insert", () => {
  test("sets a missing key and returns the object", () => {
    const target = {};
    const result = insert(target, "a", 1);

    expect(result).toBe(target);
    expect(result).toEqual({ a: 1 });
    expectTypeOf(result.a).toEqualTypeOf<number>();
  });

  test("throws on an own key, leaving its value", () => {
    const target = { a: 1 };

    expect(() => insert(target, "a", 2)).toThrow(
      new TypeError('Key "a" is already set.'),
    );

    expect(target.a).toBe(1);
  });

  test("shadows an inherited key", () => {
    expect(insert({}, "toString", 1)).toEqual({ toString: 1 });
  });
});
