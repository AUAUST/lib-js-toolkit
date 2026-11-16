import { describe, expect, expectTypeOf, test } from "vitest";

import { merge } from "@auaust/toolkit/merger";

describe("merge", () => {
  test("merges plain objects recursively into its target", () => {
    const target = {
      a: { x: 1 },
      b: 1,
    };
    const result = merge(target, {
      a: { y: 2 },
      b: 2,
    });

    expect(result).toBe(target);
    expect(result).toEqual({
      a: { x: 1, y: 2 },
      b: 2,
    });

    expectTypeOf(result).toEqualTypeOf<{
      a: { x: number; y: number };
      b: number;
    }>();
  });

  test("skips keys whose kinds mismatch", () => {
    const target = {
      a: 1,
      b: { x: 1 },
    };
    const result = merge(target, {
      a: { y: 2 },
      b: 3,
    });

    expect(result).toEqual({
      a: 1,
      b: { x: 1 },
    });
    expectTypeOf(result).toEqualTypeOf<{ a: number; b: { x: number } }>();
  });

  test("never mutates sources", () => {
    const first = {
      a: { x: 1 },
    };
    const second = {
      a: { y: 2 },
    };
    const result = merge({}, first, second);

    expect(result).toEqual({
      a: { x: 1, y: 2 },
    });
    expect(first).toEqual({
      a: { x: 1 },
    });
    expect(result.a).not.toBe(first.a);
  });

  test("skips __proto__ keys", () => {
    const result = merge({}, JSON.parse('{"__proto__": {"polluted": true}}'));

    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(Object.keys(result)).toEqual([]);
  });

  test("terminates on a cyclic source", () => {
    const source: Record<string, unknown> = { value: 1 };

    source.self = source;

    const result: Record<string, unknown> = merge({}, source);

    expect(result.value).toBe(1);
    expect((result.self as Record<string, unknown>).self).toBe(result.self);
    expect(result.self).not.toBe(source);
  });
});
