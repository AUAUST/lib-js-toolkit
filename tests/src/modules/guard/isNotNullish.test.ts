import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotNullish } from "@auaust/toolkit/guard";

import { createValues } from "#tests/fixtures/values";

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

  test("narrows to NonNullable", () => {
    const nullable = null as string | null;
    const candidate: unknown = null;

    if (isNotNullish(nullable)) {
      expectTypeOf(nullable).toEqualTypeOf<string>();
    }

    if (isNotNullish(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<{}>();
    }
  });
});
