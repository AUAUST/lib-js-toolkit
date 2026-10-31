import { describe, expect, expectTypeOf, test } from "vitest";

import { isNotSymbol } from "@auaust/toolkit/guard";

import { createValues } from "../../fixtures/values";

describe("isNotSymbol", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const candidate: unknown = value;

    expect(isNotSymbol(candidate)).toBe(typeof candidate !== "symbol");
  });

  test("narrows a union in both branches", () => {
    const candidate = Symbol.for("a") as string | symbol;

    if (isNotSymbol(candidate)) {
      expectTypeOf(candidate).toEqualTypeOf<string>();
    } else {
      expectTypeOf(candidate).toEqualTypeOf<symbol>();
    }
  });

  test("keeps unknown unchanged in the true branch", () => {
    const candidate: unknown = Symbol.for("a");

    if (isNotSymbol(candidate)) {
      expectTypeOf(candidate).toBeUnknown();
    }
  });
});
