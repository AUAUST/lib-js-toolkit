import { describe, expect, expectTypeOf, test } from "vitest";

import { slug, toSlug } from "@auaust/toolkit/string";

describe("toSlug", () => {
  test("removes accents and punctuation", () => {
    expect(toSlug("Crème Brûlée!")).toBe("creme-brulee");
    expect(slug).toBe(toSlug);
  });

  test("splits words on case changes", () => {
    expect(toSlug("fooBar")).toBe("foo-bar");
  });

  test("keeps accents when unaccent is false", () => {
    expect(toSlug("Crème Brûlée!", { unaccent: false })).toBe("crème-brûlée");
  });

  test("slugs NFC and NFD input alike", () => {
    expect(toSlug("Cre\u0300me", { unaccent: false })).toBe(
      toSlug("Crème", { unaccent: false }),
    );

    expect(toSlug("Cre\u0300me")).toBe("creme");
  });

  test("keeps combining vowel signs when unaccent is false", () => {
    expect(toSlug("हिन्दी", { unaccent: false })).toBe("हिन्दी");
  });

  test("keeps literal types", () => {
    expectTypeOf(toSlug("Hello, World!")).toEqualTypeOf<"hello-world">();
    expectTypeOf(toSlug("v2Api")).toEqualTypeOf<"v-2-api">();
    expectTypeOf(toSlug("a b" as "a b" | "C")).toEqualTypeOf<"a-b" | "c">();
    expectTypeOf(toSlug("a" as string)).toEqualTypeOf<string>();
    expectTypeOf(toSlug("café")).toEqualTypeOf<string>();
    expectTypeOf(toSlug("a b", { unaccent: false })).toEqualTypeOf<string>();
  });
});
