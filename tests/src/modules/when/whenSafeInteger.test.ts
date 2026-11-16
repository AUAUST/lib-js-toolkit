import { describe, expect, test } from "vitest";

import { whenSafeInteger } from "@auaust/toolkit";

describe("whenSafeInteger", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenSafeInteger(1, "safe", "unsafe")).toBe("safe");
    expect(whenSafeInteger(2 ** 53, "safe", "unsafe")).toBe("unsafe");
  });
});
