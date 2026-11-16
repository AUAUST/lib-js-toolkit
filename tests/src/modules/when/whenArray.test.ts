import { describe, expect, test } from "vitest";

import { whenArray } from "@auaust/toolkit";

describe("whenArray", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenArray([1], (a) => a.length, 0)).toBe(1);
    expect(whenArray("a", (a) => a.length, 0)).toBe(0);
  });
});
