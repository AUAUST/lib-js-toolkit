import { describe, expect, expectTypeOf, test } from "vitest";

import { prepend } from "@auaust/toolkit/string";

describe("prepend", () => {
  test("prepends the prefixes in order", () => {
    expect(prepend("c", "a", "b")).toBe("abc");
    expectTypeOf(prepend("c", "a")).toEqualTypeOf<string>();
  });

  test("joins with the separator", () => {
    expect(prepend("c", "a", "b", { separator: "/" })).toBe("a/b/c");
    expect(prepend(undefined, "a")).toBeUndefined();
  });
});
