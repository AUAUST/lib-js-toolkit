import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotNull } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isNotNull", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const candidate: unknown = value;

    expect(isNotNull(candidate)).toBe(candidate !== null);
  });

  test("narrows a union in both branches", () => {
    const candidate = null as string | null;

    if (isNotNull(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<null>();
    }
  });

  test("keeps unknown unchanged in the true branch", () => {
    const candidate: unknown = null;

    if (isNotNull(candidate)) {
      expectTypeOf(candidate).toBeUnknown();
    }
  });
});
