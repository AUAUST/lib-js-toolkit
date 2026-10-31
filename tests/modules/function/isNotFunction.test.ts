import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotFunction } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isNotFunction", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const candidate: unknown = value;

    expect(isNotFunction(candidate)).toBe(typeof candidate !== "function");
  });

  test("narrows a union in both branches", () => {
    const candidate = (() => {}) as string | (() => void);

    if (isNotFunction(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<() => void>();
    }
  });

  test("keeps unknown unchanged in the true branch", () => {
    const candidate: unknown = () => {};

    if (isNotFunction(candidate)) {
      expectTypeOf(candidate).toBeUnknown();
    }
  });
});
