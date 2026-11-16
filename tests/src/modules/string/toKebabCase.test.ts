import { describe, expect, test } from "vitest";

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
});
