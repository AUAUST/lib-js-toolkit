import { describe, expect, test } from "vitest";

import { whenAsyncGeneratorFunction } from "@auaust/toolkit";

describe("whenAsyncGeneratorFunction", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenAsyncGeneratorFunction(async function* () {}, "true", "false"),
    ).toBe("true");

    expect(whenAsyncGeneratorFunction(function* () {}, "true", "false")).toBe(
      "false",
    );
  });
});
