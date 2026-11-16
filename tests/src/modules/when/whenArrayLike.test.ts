import { describe, expect, test } from "vitest";

import { whenArrayLike } from "@auaust/toolkit";

describe("whenArrayLike", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenArrayLike({ length: 0 }, true, false)).toBe(true);
    expect(whenArrayLike(1, true, false)).toBe(false);
  });
});
