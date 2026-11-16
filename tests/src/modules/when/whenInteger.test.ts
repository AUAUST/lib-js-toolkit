import { describe, expect, test } from "vitest";

import { whenInteger } from "@auaust/toolkit";

describe("whenInteger", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenInteger(1, "int", "float")).toBe("int");
    expect(whenInteger(1.5, "int", "float")).toBe("float");
  });
});
