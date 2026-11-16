import { describe, expect, expectTypeOf, test } from "vitest";

import { loosen } from "@auaust/toolkit/array";

describe("loosen", () => {
  test("returns the same readonly tuple as a readonly array", () => {
    const tuple = [1, "a"] as const;
    const result = loosen(tuple);

    expect(result).toBe(tuple);
    expectTypeOf(result).toEqualTypeOf<readonly (1 | "a")[]>();
  });

  test("widens a mutable tuple to a mutable array", () => {
    const tuple: [number, string] = [1, "a"];

    expectTypeOf(loosen(tuple)).toEqualTypeOf<(number | string)[]>();
  });

  test("returns undefined for a nullish array", () => {
    const maybe = null as [number, string] | null;

    expect(loosen(maybe)).toBeUndefined();

    expectTypeOf(loosen(maybe)).toEqualTypeOf<
      (number | string)[] | undefined
    >();
  });
});
