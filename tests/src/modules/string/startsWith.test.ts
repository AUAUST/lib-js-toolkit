import { describe, expect, expectTypeOf, test } from "vitest";

import { startsWith } from "@auaust/toolkit/string";

describe("startsWith", () => {
  test("follows the native", () => {
    expect(startsWith("abc", "ab")).toBe(true);
    expect(startsWith("abc", "b", 1)).toBe(true);
    expectTypeOf(startsWith("abc", "a")).toEqualTypeOf<boolean>();
  });

  test("returns undefined for nullish input", () => {
    expect(startsWith(null, "a")).toBeUndefined();
    expectTypeOf(startsWith(null, "a")).toEqualTypeOf<undefined>();
  });
});
