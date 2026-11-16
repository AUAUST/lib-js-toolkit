import { describe, expect, expectTypeOf, test } from "vitest";

import { concat } from "@auaust/toolkit/string";

describe("concat", () => {
  test("appends the parts", () => {
    expect(concat("a", "b", "c")).toBe("abc");
    expectTypeOf(concat("a", "b")).toEqualTypeOf<string>();
  });

  test("keeps empty parts between separators", () => {
    expect(concat("a", "", "b", { separator: "-" })).toBe("a--b");
    expect(concat(null, "b")).toBeUndefined();
  });
});
