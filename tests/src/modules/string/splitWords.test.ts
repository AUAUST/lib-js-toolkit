import { describe, expect, expectTypeOf, test } from "vitest";

import { splitWords } from "@auaust/toolkit/string";

describe("splitWords", () => {
  test("splits on separators, case changes and digits", () => {
    expect(splitWords("fooBar_baz-2x")).toEqual([
      "foo",
      "Bar",
      "baz",
      "2",
      "x",
    ]);

    expectTypeOf(splitWords("a")).toEqualTypeOf<string[]>();
  });

  test("keeps accents unless unaccent is set", () => {
    expect(splitWords("crème brûlée")).toEqual(["crème", "brûlée"]);

    expect(splitWords("crème brûlée", { unaccent: true })).toEqual([
      "creme",
      "brulee",
    ]);
  });

  test("returns undefined for nullish input", () => {
    expect(splitWords(null)).toBeUndefined();
  });

  test("drops non-word characters and keeps apostrophes inside words", () => {
    expect(splitWords("@scope/pkg don't")).toEqual(["scope", "pkg", "dont"]);
  });
});
