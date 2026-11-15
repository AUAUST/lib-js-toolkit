import { describe, expect, expectTypeOf, test } from "vitest";

import { create, pick } from "@auaust/toolkit/object";

describe("pick", () => {
  test("copies own keys into a new object, skipping missing and inherited ones", () => {
    const target = {
      a: 1,
    } as const;

    const result = pick(target, "a", "toString");

    expectTypeOf(result).toEqualTypeOf<{ a: 1 }>();

    expect(result).toEqual({
      a: 1,
    });

    expect(result).not.toBe(target);
    expect(pick(create({ inherited: 1 }), "inherited")).toEqual({});
  });

  test("matches numeric keys and keeps optional properties optional", () => {
    const target = {} as { 1?: string; b: number };

    expectTypeOf(pick(target, "1")).toEqualTypeOf<{ 1?: string }>();

    expect(
      pick(
        {
          1: "a",
        },
        1,
      ),
    ).toEqual({
      1: "a",
    });
  });
});
