import { describe, expect, test } from "vitest";

import { whenPropertyComposer } from "@auaust/toolkit";

describe("whenPropertyComposer", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenPropertyComposer({ name: "key", value: 1 }, true, false)).toBe(
      true,
    );

    expect(whenPropertyComposer({ value: 1 }, true, false)).toBe(false);
  });
});
