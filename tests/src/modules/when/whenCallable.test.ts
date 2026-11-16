import { describe, expect, test } from "vitest";

import { whenCallable } from "@auaust/toolkit";

describe("whenCallable", () => {
  test("resolves the branch the guard selects", () => {
    expect(
      whenCallable(
        () => 1,
        (fn) => fn(),
      ),
    ).toBe(1);

    expect(whenCallable(1, "true", "false")).toBe("false");
  });
});
