import { describe, expect, test } from "vitest";

import { uncapitalizeWords } from "@auaust/toolkit/string";

describe("uncapitalizeWords", () => {
  test("uncapitalizes each word, keeping whitespace as given", () => {
    expect(uncapitalizeWords("Foo  BAR\nBaz")).toBe("foo  bAR\nbaz");
  });

  test("returns undefined for nullish input", () => {
    expect(uncapitalizeWords(undefined)).toBeUndefined();
  });
});
