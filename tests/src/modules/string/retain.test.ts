import { describe, expect, expectTypeOf, test } from "vitest";

import { retain } from "@auaust/toolkit/string";

describe("retain", () => {
  test("keeps only the matches", () => {
    expect(retain("a1b2", /\d/)).toBe("12");
    expect(retain("abcab", "ab")).toBe("abab");
    expect(retain("abc", /\d/)).toBe("");
    expectTypeOf(retain("a", "a")).toEqualTypeOf<string>();
  });

  test("stays stateless with a global regex", () => {
    const pattern = /\d/g;

    expect(retain("a1b2", pattern)).toBe("12");
    expect(retain("a1b2", pattern)).toBe("12");
    expect(pattern.lastIndex).toBe(0);
  });
});
