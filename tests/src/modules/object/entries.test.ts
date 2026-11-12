import { describe, expect, expectTypeOf, test } from "vitest";

import { entries } from "@auaust/toolkit/object";

describe("entries", () => {
  test("retains key-value correlations and stringifies numeric keys", () => {
    const key = Symbol("ignored");

    const result = entries({
      name: "entry" as const,
      1: 42 as const,
      [key]: true,
    });

    expectTypeOf(result).toEqualTypeOf<(["name", "entry"] | ["1", 42])[]>();
    expect(entries).toBe(Object.entries);

    expect(result).toEqual([
      ["1", 42],
      ["name", "entry"],
    ]);
  });

  test("handles arrays and optional properties", () => {
    const optional: { value?: number } = {};

    expectTypeOf(entries(optional)).toEqualTypeOf<
      ["value", number | undefined][]
    >();

    expectTypeOf(entries([1, 2])).toEqualTypeOf<[`${number}`, number][]>();
    expect(entries(optional)).toEqual([]);

    expect(entries("ab")).toEqual([
      ["0", "a"],
      ["1", "b"],
    ]);
  });
});
