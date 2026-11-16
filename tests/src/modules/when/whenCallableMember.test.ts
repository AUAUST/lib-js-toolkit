import { describe, expect, test } from "vitest";

import { whenCallableMember } from "@auaust/toolkit";

describe("whenCallableMember", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenCallableMember({ go() {} }, "go", true, false)).toBe(true);
    expect(whenCallableMember({ go: 1 }, "go", true, false)).toBe(false);
  });
});
