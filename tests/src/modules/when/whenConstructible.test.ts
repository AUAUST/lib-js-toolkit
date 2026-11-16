import { describe, expect, test } from "vitest";

import { whenConstructible } from "@auaust/toolkit";

describe("whenConstructible", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenConstructible(function () {}, "true", "false")).toBe("true");
    expect(whenConstructible(() => 1, "true", "false")).toBe("false");
  });
});
