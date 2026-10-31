import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotUndefined } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isNotUndefined", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const candidate: unknown = value;

    expect(isNotUndefined(candidate)).toBe(candidate !== undefined);
  });

  test("narrows a union in both branches", () => {
    const candidate = undefined as string | undefined;

    if (isNotUndefined(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<undefined>();
    }
  });

  test("keeps unknown unchanged in the true branch", () => {
    const candidate: unknown = undefined;

    if (isNotUndefined(candidate)) {
      expectTypeOf(candidate).toBeUnknown();
    }
  });
});
