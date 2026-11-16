import { describe, expect, expectTypeOf, test } from "vitest";

import { entries, loosenKeys } from "@auaust/toolkit/object";

describe("loosenKeys", () => {
  test("returns the same object with widened keys", () => {
    const object = { a: 1 } as const;
    const result = loosenKeys(object);

    expect(result).toBe(object);
    expectTypeOf(result).toEqualTypeOf<Record<string, 1>>();
    expectTypeOf(entries(result)).toEqualTypeOf<[string, 1][]>();
  });

  test("widens symbol keys to symbol", () => {
    const symbol = Symbol("key");
    const object = { a: 1, [symbol]: 2 } as const;

    expectTypeOf(loosenKeys(object)).toEqualTypeOf<
      Record<string | symbol, 1 | 2>
    >();
  });

  test("returns undefined for a nullish object", () => {
    const maybe = null as { a: 1 } | null;

    expect(loosenKeys(maybe)).toBeUndefined();

    expectTypeOf(loosenKeys(maybe)).toEqualTypeOf<
      Record<string, 1> | undefined
    >();
  });
});
