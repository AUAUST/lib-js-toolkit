import { describe, expect, test } from "vitest";

import { title, toTitleCase } from "@auaust/toolkit/string";

describe("toTitleCase", () => {
  test("capitalizes each word and joins them with spaces", () => {
    expect(toTitleCase("hello-WORLD_foo")).toBe("Hello World Foo");
    expect(title).toBe(toTitleCase);
  });

  test("returns undefined for nullish input", () => {
    expect(toTitleCase(undefined)).toBeUndefined();
  });
});
