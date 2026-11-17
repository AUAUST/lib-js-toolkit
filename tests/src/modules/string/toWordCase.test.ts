import { describe, expect, expectTypeOf, test } from "vitest";

import { toWordCase } from "@auaust/toolkit/string";

describe("toWordCase", () => {
  test("lowercases and optionally capitalizes", () => {
    expect(toWordCase("hELLO", { capitalized: true })).toBe("Hello");

    expectTypeOf(
      toWordCase("hELLO", { capitalized: true }),
    ).toEqualTypeOf<"Hello">();

    expect(toWordCase("hELLO")).toBe("hello");
    expectTypeOf(toWordCase("hELLO")).toEqualTypeOf<"hello">();
  });

  test("widens with a locale or a wide string", () => {
    expectTypeOf(
      toWordCase("hELLO", { capitalized: true, locale: "tr" }),
    ).toEqualTypeOf<string>();

    expectTypeOf(toWordCase("a" as string)).toEqualTypeOf<string>();
  });
});
