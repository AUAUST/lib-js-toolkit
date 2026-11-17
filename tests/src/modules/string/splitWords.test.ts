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

    expectTypeOf(splitWords("a")).toEqualTypeOf<["a"]>();
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

  test("keeps literal types", () => {
    expectTypeOf(splitWords("fooBar-baz")).toEqualTypeOf<
      ["foo", "Bar", "baz"]
    >();

    expectTypeOf(splitWords("XMLHttpRequest")).toEqualTypeOf<
      ["XML", "Http", "Request"]
    >();

    expectTypeOf(splitWords("don't stop")).toEqualTypeOf<["dont", "stop"]>();
    expectTypeOf(splitWords("v2Api")).toEqualTypeOf<["v", "2", "Api"]>();

    expectTypeOf(splitWords("a b" as "a b" | "c")).toEqualTypeOf<
      ["a", "b"] | ["c"]
    >();

    expectTypeOf(splitWords("a" as string)).toEqualTypeOf<string[]>();
    expectTypeOf(splitWords("café")).toEqualTypeOf<string[]>();

    expectTypeOf(splitWords("a b", { unaccent: true })).toEqualTypeOf<
      string[]
    >();
  });

  test("accepts the locale alone", () => {
    expect(splitWords("I a", "tr")).toEqual(["I", "a"]);

    expect(splitWords("I a", "tr")).toEqual(
      splitWords("I a", { locale: "tr" }),
    );

    expectTypeOf(splitWords("I a", "tr")).toEqualTypeOf<string[]>();
  });
});
