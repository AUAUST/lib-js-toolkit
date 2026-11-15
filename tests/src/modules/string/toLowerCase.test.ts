import { describe, expect, expectTypeOf, test } from "vitest";

import { lower, toLowerCase } from "@auaust/toolkit/string";

describe("toLowerCase", () => {
  test("keeps literal types", () => {
    expect(lower("FOO")).toBe("foo");
    expectTypeOf(lower("FOO")).toEqualTypeOf<"foo">();
    expectTypeOf(lower("A" as string)).toEqualTypeOf<string>();
  });

  test("passes nullish input through", () => {
    expect(lower(null)).toBeNull();
    expectTypeOf(lower(undefined)).toEqualTypeOf<undefined>();
  });

  test("is aliased lower", () => {
    expect(lower).toBe(toLowerCase);
  });
});
