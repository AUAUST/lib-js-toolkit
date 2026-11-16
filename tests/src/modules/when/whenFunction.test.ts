import { describe, expect, test } from "vitest";

import { whenFunction } from "@auaust/toolkit";

describe("whenFunction", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenFunction(() => 1, "true", "false")).toBe("true");
    expect(whenFunction(1, "true", "false")).toBe("false");
  });
});
