import { describe, expect, test } from "vitest";

import { whenMethod } from "@auaust/toolkit";

describe("whenMethod", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenMethod({ go() {} }, "go", true, false)).toBe(true);
    expect(whenMethod({ go: 1 }, "go", true, false)).toBe(false);
  });

  test("types the candidate as holding the method", () => {
    const target: unknown = { go: () => 1 };

    expect(whenMethod(target, "go", (t) => t.go())).toBe(1);
  });
});
