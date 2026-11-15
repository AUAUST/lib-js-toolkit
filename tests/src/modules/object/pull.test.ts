import { describe, expect, expectTypeOf, test } from "vitest";

import { pull } from "@auaust/toolkit/object";

describe("pull", () => {
  test("deletes a single own key and returns its value", () => {
    const target: { a?: number; b: string } = {
      a: 1,
      b: "kept",
    };

    const result = pull(target, "a");

    expectTypeOf(result).toEqualTypeOf<number | undefined>();
    expect(result).toBe(1);

    expect(target).toEqual({
      b: "kept",
    });

    expect(pull(target, "toString")).toBeUndefined();
  });

  test("pulls a list of own keys into a new object", () => {
    const target: { a?: number; b?: string; c: boolean } = {
      a: 1,
      b: "pulled",
      c: true,
    };

    const result = pull(target, ["a", "b", "toString"]);

    expectTypeOf(result).toEqualTypeOf<{ a?: number; b?: string }>();

    expect(result).toEqual({
      a: 1,
      b: "pulled",
    });

    expect(target).toEqual({
      c: true,
    });
  });
});
