import { describe, expect, test } from "vitest";

import { whenIterable } from "@auaust/toolkit";

describe("whenIterable", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenIterable("ab")).toBe("ab");
    expect(whenIterable(1)).toBeUndefined();
  });
});
