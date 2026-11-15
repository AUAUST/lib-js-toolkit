import { describe, expect, test } from "vitest";

import { repeat } from "@auaust/toolkit/string";

describe("repeat", () => {
  test("repeats the string", () => {
    expect(repeat("ab", 2)).toBe("abab");
    expect(repeat(null, 2)).toBeNull();
  });

  test("throws a RangeError for a negative count", () => {
    expect(() => repeat("a", -1)).toThrow(RangeError);
  });
});
