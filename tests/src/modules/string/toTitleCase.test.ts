import { describe, expect, expectTypeOf, test } from "vitest";

import { title, toTitleCase } from "@auaust/toolkit/string";

describe("toTitleCase", () => {
  test("capitalizes each word and joins them with spaces", () => {
    expect(toTitleCase("hello-WORLD_foo")).toBe("Hello World Foo");
    expect(title).toBe(toTitleCase);
  });

  test("returns undefined for nullish input", () => {
    expect(toTitleCase(undefined)).toBeUndefined();
  });

  test("keeps literal types", () => {
    expectTypeOf(toTitleCase("foo_bar")).toEqualTypeOf<"Foo Bar">();
    expectTypeOf(toTitleCase("v2Api")).toEqualTypeOf<"V 2 Api">();

    expectTypeOf(toTitleCase("a b" as "a b" | "c")).toEqualTypeOf<
      "A B" | "C"
    >();

    expectTypeOf(toTitleCase("a" as string)).toEqualTypeOf<string>();
    expectTypeOf(toTitleCase("café")).toEqualTypeOf<string>();
    expectTypeOf(toTitleCase("a b", { locale: "tr" })).toEqualTypeOf<string>();
  });

  test("accepts the locale alone", () => {
    expect(toTitleCase("i a", "tr")).toBe("İ A");
    expect(toTitleCase("i a", "tr")).toBe(toTitleCase("i a", { locale: "tr" }));
    expectTypeOf(toTitleCase("i a", "tr")).toEqualTypeOf<string>();
  });
});
