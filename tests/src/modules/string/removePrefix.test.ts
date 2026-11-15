import { describe, expect, expectTypeOf, test } from "vitest";

import { removePrefix } from "@auaust/toolkit/string";

describe("removePrefix", () => {
  test("removes the prefix", () => {
    expect(removePrefix("foobar", "foo")).toBe("bar");
    expectTypeOf(removePrefix("foobar", "foo")).toEqualTypeOf<string>();
  });

  test("returns the string unchanged when the prefix is absent", () => {
    expect(removePrefix("foo", "x")).toBe("foo");
    expect(removePrefix(undefined, "x")).toBeUndefined();
  });
});
