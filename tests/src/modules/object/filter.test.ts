import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { filter } from "@auaust/toolkit/object";

describe("filter", () => {
  test("drops null and undefined values by default", () => {
    const result = filter({
      a: 1,
      b: undefined,
      c: null,
    });

    expect(result).toEqual({ a: 1 });
    expect(Object.keys(result)).toEqual(["a"]);
    expectTypeOf(result).toEqualTypeOf<{ a: number }>();
  });

  test("passes value, key and object to the predicate, keeping symbol keys", () => {
    const key = Symbol("key");

    const source = {
      a: 1,
      b: 2,
      [key]: 3,
    };

    const predicate = vi.fn((value: number) => value !== 2);

    const result = filter(source, predicate);

    expect(predicate.mock.calls).toEqual([
      [1, "a", source],
      [2, "b", source],
      [3, key, source],
    ]);

    expect(result).toEqual({ a: 1, [key]: 3 });
    expect(result).not.toBe(source);

    expect(source).toEqual({
      a: 1,
      b: 2,
      [key]: 3,
    });
  });

  test("keeps an own __proto__ key as a key", () => {
    const source = JSON.parse('{"__proto__": 1}') as Record<string, number>;
    const result = filter(source);

    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, "__proto__")).toBe(true);
  });
});
