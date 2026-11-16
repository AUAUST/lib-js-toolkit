import { describe, expect, expectTypeOf, test } from "vitest";

import { withPrefix } from "@auaust/toolkit/string";

describe("withPrefix", () => {
  test("keeps an existing prefix", () => {
    expect(withPrefix("/a", "/")).toBe("/a");
    expectTypeOf(withPrefix("/a", "/")).toEqualTypeOf<string>();
  });

  test("adds a missing prefix", () => {
    expect(withPrefix("a", "/")).toBe("/a");
    expect(withPrefix(null, "/")).toBeUndefined();
  });
});
