import { describe, expect, test } from "vitest";

import { whenNaN } from "@auaust/toolkit";

describe("whenNaN", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenNaN(NaN)).toBeNaN();
    expect(whenNaN(1, "nan", "number")).toBe("number");
  });
});
