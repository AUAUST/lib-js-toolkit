import { describe, expect, test } from "vitest";

import { isInteger } from "@auaust/toolkit/guard";

describe("isInteger", () => {
  test("is Number.isInteger", () => {
    expect(isInteger).toBe(Number.isInteger);
  });
});
