import { describe, expect, expectTypeOf, test } from "vitest";

import { withSuffix } from "@auaust/toolkit/string";

describe("withSuffix", () => {
  test("keeps an existing suffix", () => {
    expect(withSuffix("a/", "/")).toBe("a/");
    expectTypeOf(withSuffix("a/", "/")).toEqualTypeOf<string>();
  });

  test("adds a missing suffix", () => {
    expect(withSuffix("a", "/")).toBe("a/");
    expect(withSuffix(undefined, "/")).toBeUndefined();
  });
});
