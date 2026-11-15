import { describe, expect, expectTypeOf, test } from "vitest";

import { omit } from "@auaust/toolkit/object";

describe("omit", () => {
  test("copies the other keys into a new object, comparing numeric keys as property keys", () => {
    const target = {
      1: "a",
      b: 2,
    } as const;

    const result = omit(target, 1);

    expectTypeOf(result).toEqualTypeOf<{ b: 2 }>();

    expect(result).toEqual({
      b: 2,
    });

    expect(target).toEqual({
      1: "a",
      b: 2,
    });
  });

  test("keeps symbol keys and returns a copy without keys", () => {
    const key = Symbol("key");

    const target = {
      [key]: true,
    };

    const result = omit(target);

    expect(result).not.toBe(target);
    expect(result[key]).toBe(true);
  });
});
