import { describe, expect, expectTypeOf, test } from "vitest";

import { values } from "@auaust/toolkit/object";

describe("values", () => {
  test("infers string-keyed values and excludes symbol-keyed ones", () => {
    const result = values({
      name: "entry" as const,
      1: true,
      [Symbol()]: 42,
    });

    expectTypeOf(result).toEqualTypeOf<("entry" | boolean)[]>();
    expectTypeOf(values([1, 2])).toEqualTypeOf<number[]>();
    expect(values).toBe(Object.values);
    expect(result).toEqual([true, "entry"]);
    expect(values({})).toEqual([]);
  });

  test("handles unions, optional properties, readonly tuples, and strings", () => {
    const target = {} as { first?: number } | { second: string };
    const tuple = [1, "entry"] as const;

    expectTypeOf(values(target)).toEqualTypeOf<
      (number | string | undefined)[]
    >();

    expectTypeOf(values(tuple)).toEqualTypeOf<(1 | "entry")[]>();
    expectTypeOf(values("ab")).toEqualTypeOf<string[]>();
    expectTypeOf(values({})).toEqualTypeOf<never[]>();

    expectTypeOf(
      values({
        [Symbol()]: true,
      }),
    ).toEqualTypeOf<never[]>();

    expect(values(tuple)).toEqual([1, "entry"]);
    expect(values("ab")).toEqual(["a", "b"]);
  });
});
