import { describe, expect, test } from "vitest";

import { toDelimitedCase } from "@auaust/toolkit/string";

describe("toDelimitedCase", () => {
  test("joins the words with the delimiter, keeping their case", () => {
    expect(toDelimitedCase("fooBar baz", "/")).toBe("foo/Bar/baz");
  });

  test("removes accents when unaccent is set", () => {
    expect(toDelimitedCase("çà va", "+", { unaccent: true })).toBe("ca+va");
  });
});
