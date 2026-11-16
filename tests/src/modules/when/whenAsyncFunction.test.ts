import { describe, expect, test } from "vitest";

import { whenAsyncFunction } from "@auaust/toolkit";

describe("whenAsyncFunction", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenAsyncFunction(
        async () => {
          await Promise.resolve();
        },
        "true",
        "false",
      ),
    ).toBe("true");

    expect(whenAsyncFunction(() => 1, "true", "false")).toBe("false");
  });
});
