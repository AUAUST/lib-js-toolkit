import { describe, expect, test } from "vitest";

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
});
