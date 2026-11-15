import { describe, expect, expectTypeOf, test } from "vitest";

import { toUpperCase, upper } from "@auaust/toolkit/string";

describe("toUpperCase", () => {
  test("keeps literal types", () => {
    expect(upper("foo")).toBe("FOO");
    expectTypeOf(upper("foo")).toEqualTypeOf<"FOO">();
    expectTypeOf(upper("a" as "a" | "b")).toEqualTypeOf<"A" | "B">();
    expectTypeOf(upper("a" as string)).toEqualTypeOf<string>();
  });

  test("passes nullish input through", () => {
    expect(upper(null)).toBeNull();
    expect(upper(undefined)).toBeUndefined();
    expectTypeOf(upper(null)).toEqualTypeOf<null>();
  });

  test("is aliased upper", () => {
    expect(upper).toBe(toUpperCase);
  });
});
