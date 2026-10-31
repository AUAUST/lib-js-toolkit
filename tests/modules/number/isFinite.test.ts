import { describe, expect, test } from "vitest";

import { isFinite } from "@auaust/toolkit/guard";

describe("isFinite", () => {
  test("is Number.isFinite", () => {
    expect(isFinite).toBe(Number.isFinite);
  });
});
