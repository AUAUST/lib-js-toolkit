import { describe, expect, test } from "vitest";

import { whenObject } from "@auaust/toolkit";

describe("whenObject", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenObject({}, true, false)).toBe(true);
    expect(whenObject(1, true, false)).toBe(false);
  });
});
