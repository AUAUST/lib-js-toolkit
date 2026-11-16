import { describe, expect, expectTypeOf, test } from "vitest";

import { toLocaleUpperCase } from "@auaust/toolkit/string";

describe("toLocaleUpperCase", () => {
  test("follows the given locale", () => {
    expect(toLocaleUpperCase("i", { locale: "tr" })).toBe("İ");
  });

  test("is locale-independent without a locale", () => {
    expect(toLocaleUpperCase("i")).toBe("I");
  });

  test("returns undefined for nullish input", () => {
    expect(toLocaleUpperCase(null)).toBeUndefined();
    expectTypeOf(toLocaleUpperCase(undefined)).toEqualTypeOf<undefined>();
  });
});
