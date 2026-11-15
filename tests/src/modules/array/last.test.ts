import { describe, expect, expectTypeOf, test } from "vitest";

import { last } from "@auaust/toolkit/array";

describe("last", () => {
  test("returns the last item", () => {
    const result = last(["a", "b"] as const);

    expect(result).toBe("b");
    expectTypeOf(result).toEqualTypeOf<"a" | "b" | undefined>();
  });

  test("returns undefined for an empty array, a hole or nullish", () => {
    const sparse: (number | undefined)[] = [1];

    sparse.length = 2;

    expect(last(sparse)).toBeUndefined();
    expect(last([])).toBeUndefined();
    expect(last(undefined)).toBeUndefined();
  });
});
