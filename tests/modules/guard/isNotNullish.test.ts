import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotNullish } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isNotNullish", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const candidate: unknown = value;

    expect(isNotNullish(candidate)).toBe(candidate != null);
  });

  test("narrows a union in both branches", () => {
    const candidate = null as string | null | undefined;

    if (isNotNullish(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<null | undefined>();
    }
  });

  test("keeps unknown unchanged in the true branch", () => {
    const candidate: unknown = null;

    if (isNotNullish(candidate)) {
      expectTypeOf(candidate).toBeUnknown();
    }
  });
});
