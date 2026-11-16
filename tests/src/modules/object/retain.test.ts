import { describe, expect, expectTypeOf, test } from "vitest";

import { retain } from "@auaust/toolkit/object";

describe("retain", () => {
  test("deletes the keys failing the predicate and returns the same object", () => {
    const target = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = retain(target, (value) => value !== 2);

    expect(result).toBe(target);
    expect(target).toEqual({ a: 1, c: 3 });
    expectTypeOf(result).toEqualTypeOf<{ a: number; b: number; c: number }>();
  });

  test("visits every key while deleting during the walk", () => {
    const target: Record<string, number | null> = {
      a: null,
      b: null,
      c: 1,
    };

    const visited: string[] = [];

    retain(target, (value, key) => {
      visited.push(key);

      return value != null;
    });

    expect(visited).toEqual(["a", "b", "c"]);

    expect(
      retain({
        a: 1,
        b: undefined,
        c: null,
      }),
    ).toEqual({ a: 1 });

    expect(target).toEqual({ c: 1 });
  });
});
