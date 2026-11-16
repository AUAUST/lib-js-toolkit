import { describe, expect, test } from "vitest";

import { whenGeneratorFunction } from "@auaust/toolkit";

describe("whenGeneratorFunction", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenGeneratorFunction(function* () {}, "true", "false")).toBe(
      "true",
    );

    expect(whenGeneratorFunction(() => 1, "true", "false")).toBe("false");
  });
});
