import { describe, expect, expectTypeOf, test } from "vitest";

import { withoutPrefix } from "@auaust/toolkit/string";

describe("withoutPrefix", () => {
  test("removes the prefix", () => {
    expect(withoutPrefix("foobar", "foo")).toBe("bar");
    expectTypeOf(withoutPrefix("foobar", "foo")).toEqualTypeOf<string>();
  });

  test("returns the string unchanged when the prefix is absent", () => {
    expect(withoutPrefix("foo", "x")).toBe("foo");
    expect(withoutPrefix(undefined, "x")).toBeUndefined();
  });
});
