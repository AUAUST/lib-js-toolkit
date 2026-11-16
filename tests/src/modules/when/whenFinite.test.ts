import { describe, expect, test } from "vitest";

import { whenFinite } from "@auaust/toolkit";

describe("whenFinite", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenFinite(1, "finite", "infinite")).toBe("finite");
    expect(whenFinite(Infinity)).toBeUndefined();
  });
});
