import { describe, expect, test } from "vitest";

import { diamondBy } from "@auaust/toolkit";

describe("diamondBy", () => {
  test("compares by property", () => {
    expect(diamondBy({ a: 1 }, { a: 2 }, "a")).toBe(-1);
    expect(diamondBy({ a: 1 }, { a: 2 }, "a", { reverse: true })).toBe(1);
  });

  test("compares by callback", () => {
    expect(diamondBy("ab", "a", (value) => value.length)).toBe(1);
  });
});
