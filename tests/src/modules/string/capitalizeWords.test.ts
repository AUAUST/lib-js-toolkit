import { describe, expect, test } from "vitest";

import { capitalizeWords } from "@auaust/toolkit/string";

describe("capitalizeWords", () => {
  test("capitalizes each word", () => {
    expect(capitalizeWords("foo bar\tbaz")).toBe("Foo Bar\tBaz");
  });

  test("keeps whitespace as given", () => {
    expect(capitalizeWords("a  b")).toBe("A  B");
    expect(capitalizeWords(" a ")).toBe(" A ");
  });

  test("returns undefined for nullish input", () => {
    expect(capitalizeWords(null)).toBeUndefined();
  });
});
