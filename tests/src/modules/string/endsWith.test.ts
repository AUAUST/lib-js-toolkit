import { describe, expect, expectTypeOf, test } from "vitest";

import { endsWith } from "@auaust/toolkit/string";

describe("endsWith", () => {
  test("follows the native", () => {
    expect(endsWith("abc", "bc")).toBe(true);
    expect(endsWith("abc", "c", 2)).toBe(false);
    expectTypeOf(endsWith("abc", "c")).toEqualTypeOf<boolean>();
  });

  test("passes nullish input through", () => {
    expect(endsWith(undefined, "a")).toBeUndefined();
  });
});
