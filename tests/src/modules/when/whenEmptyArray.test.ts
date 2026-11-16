import { describe, expect, test } from "vitest";

import { whenEmptyArray } from "@auaust/toolkit";

describe("whenEmptyArray", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenEmptyArray([], true, false)).toBe(true);
    expect(whenEmptyArray([1], true, false)).toBe(false);
  });
});
