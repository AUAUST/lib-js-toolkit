import { describe, expect, expectTypeOf, test } from "vitest";

import { includes } from "@auaust/toolkit/string";

describe("includes", () => {
  test("follows the native", () => {
    expect(includes("abc", "")).toBe(true);
    expect(includes("abc", "d")).toBe(false);
    expectTypeOf(includes("abc", "b")).toEqualTypeOf<boolean>();
  });

  test("passes nullish input through", () => {
    expect(includes(null, "a")).toBeNull();
  });
});
