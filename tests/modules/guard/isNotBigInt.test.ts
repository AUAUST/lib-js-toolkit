import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotBigInt } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isNotBigInt", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const candidate: unknown = value;

    expect(isNotBigInt(candidate)).toBe(typeof candidate !== "bigint");
  });

  test("narrows a union in both branches", () => {
    const candidate = 1n as string | bigint;

    if (isNotBigInt(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<bigint>();
    }
  });

  test("keeps unknown unchanged in the true branch", () => {
    const candidate: unknown = 1n;

    if (isNotBigInt(candidate)) {
      expectTypeOf(candidate).toBeUnknown();
    }
  });
});
