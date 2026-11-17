import { describe, expect, expectTypeOf, test } from "vitest";

import { pascal, toPascalCase } from "@auaust/toolkit/string";

describe("toPascalCase", () => {
  test("capitalizes every word", () => {
    expect(toPascalCase("hello_world")).toBe("HelloWorld");
    expect(pascal).toBe(toPascalCase);
  });

  test("drops characters that are not part of a word", () => {
    expect(toPascalCase("@typescript-eslint")).toBe("TypescriptEslint");
  });

  test("keeps literal types", () => {
    expectTypeOf(toPascalCase("foo-BAR")).toEqualTypeOf<"FooBar">();
    expectTypeOf(toPascalCase("v2Api")).toEqualTypeOf<"V2Api">();

    expectTypeOf(toPascalCase("a b" as "a b" | "c")).toEqualTypeOf<
      "AB" | "C"
    >();

    expectTypeOf(toPascalCase("a" as string)).toEqualTypeOf<string>();
    expectTypeOf(toPascalCase("café")).toEqualTypeOf<string>();
    expectTypeOf(toPascalCase("a b", { locale: "tr" })).toEqualTypeOf<string>();
  });

  test("accepts the locale alone", () => {
    expect(toPascalCase("i a", "tr")).toBe("İA");

    expect(toPascalCase("i a", "tr")).toBe(
      toPascalCase("i a", { locale: "tr" }),
    );

    expectTypeOf(toPascalCase("i a", "tr")).toEqualTypeOf<string>();
  });
});
