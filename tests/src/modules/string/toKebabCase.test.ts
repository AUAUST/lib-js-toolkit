import { describe, expect, test } from "vitest";

import { kebab, toKebabCase } from "@auaust/toolkit/string";

describe("toKebabCase", () => {
  test("splits an acronym before a capitalized word", () => {
    expect(toKebabCase("XMLHttpRequest")).toBe("xml-http-request");
    expect(kebab).toBe(toKebabCase);
  });

  test("passes nullish input through", () => {
    expect(toKebabCase(null)).toBeNull();
  });
});
