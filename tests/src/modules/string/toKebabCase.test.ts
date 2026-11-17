import { describe, expect, expectTypeOf, test } from "vitest";

import { kebab, toKebabCase } from "@auaust/toolkit/string";

describe("toKebabCase", () => {
  test("splits an acronym before a capitalized word", () => {
    expect(toKebabCase("XMLHttpRequest")).toBe("xml-http-request");
    expect(kebab).toBe(toKebabCase);
  });

  test("returns undefined for nullish input", () => {
    expect(toKebabCase(null)).toBeUndefined();
  });

  test("removes apostrophes without breaking words", () => {
    expect(toKebabCase("don't stop")).toBe("dont-stop");
  });

  test("keeps literal types", () => {
    expectTypeOf(toKebabCase("fooBar")).toEqualTypeOf<"foo-bar">();
    expectTypeOf(toKebabCase("v2Api")).toEqualTypeOf<"v-2-api">();

    expectTypeOf(toKebabCase("a b" as "a b" | "C")).toEqualTypeOf<
      "a-b" | "c"
    >();

    expectTypeOf(toKebabCase("a" as string)).toEqualTypeOf<string>();
    expectTypeOf(toKebabCase("café")).toEqualTypeOf<string>();
    expectTypeOf(toKebabCase("a b", { locale: "tr" })).toEqualTypeOf<string>();
  });
});
