import { describe, expect, test } from "vitest";

import { isSafeInteger } from "@auaust/toolkit/guard";

describe("isSafeInteger", () => {
  test("is Number.isSafeInteger", () => {
    expect(isSafeInteger).toBe(Number.isSafeInteger);
  });
});
