import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotObject } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isNotObject", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const candidate: unknown = value;

    expect(isNotObject(candidate)).toBe(
      typeof candidate !== "object" || candidate === null,
    );
  });

  test("narrows a union in both branches", () => {
    const candidate = {} as string | { key: string };

    if (isNotObject(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<{ key: string }>();
    }
  });

  test("keeps unknown unchanged in the true branch", () => {
    const candidate: unknown = {};

    if (isNotObject(candidate)) {
      expectTypeOf(candidate).toBeUnknown();
    }
  });
});
