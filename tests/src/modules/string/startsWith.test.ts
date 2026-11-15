import { describe, expect, expectTypeOf, test } from "vitest";

import { startsWith } from "@auaust/toolkit/string";

describe("startsWith", () => {
  test("follows the native", () => {
    expect(startsWith("abc", "ab")).toBe(true);
    expect(startsWith("abc", "b", 1)).toBe(true);
    expectTypeOf(startsWith("abc", "a")).toEqualTypeOf<boolean>();
  });

  test("passes nullish input through", () => {
    expect(startsWith(null, "a")).toBeNull();
    expectTypeOf(startsWith(null, "a")).toEqualTypeOf<null>();
  });
});
