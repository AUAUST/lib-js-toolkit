import { describe, expect, expectTypeOf, test } from "vitest";

import { toDelimitedCase } from "@auaust/toolkit/string";

describe("toDelimitedCase", () => {
  test("joins the words with the delimiter, keeping their case", () => {
    expect(toDelimitedCase("fooBar baz", "/")).toBe("foo/Bar/baz");
  });

  test("removes accents when unaccent is set", () => {
    expect(toDelimitedCase("çà va", "+", { unaccent: true })).toBe("ca+va");
  });

  test("keeps literal types", () => {
    expect(toDelimitedCase("fooBar baz", ".")).toBe("foo.Bar.baz");

    expectTypeOf(
      toDelimitedCase("fooBar baz", "."),
    ).toEqualTypeOf<"foo.Bar.baz">();

    expectTypeOf(toDelimitedCase("v2Api", ".")).toEqualTypeOf<"v.2.Api">();

    expectTypeOf(toDelimitedCase("a b" as "a b" | "c", ".")).toEqualTypeOf<
      "a.b" | "c"
    >();

    expectTypeOf(toDelimitedCase("a" as string, ".")).toEqualTypeOf<string>();
    expectTypeOf(toDelimitedCase("a b", "." as string)).toEqualTypeOf<string>();
    expectTypeOf(toDelimitedCase("café", ".")).toEqualTypeOf<string>();

    expectTypeOf(
      toDelimitedCase("a b", ".", { locale: "tr" }),
    ).toEqualTypeOf<string>();
  });

  test("accepts the locale alone", () => {
    expect(toDelimitedCase("I a", ".", "tr")).toBe(
      toDelimitedCase("I a", ".", { locale: "tr" }),
    );

    expectTypeOf(toDelimitedCase("I a", ".", "tr")).toEqualTypeOf<string>();
  });
});
