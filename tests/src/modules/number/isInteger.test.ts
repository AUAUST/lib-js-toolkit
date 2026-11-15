import { describe, expect, test } from "vitest";

import { isInteger } from "@auaust/toolkit/guard";

describe("isInteger", () => {
  test("is Number.isInteger", () => {
    expect(isInteger).toBe(Number.isInteger);
  });
});

test.for(["5", true, 5n])("rejects the non-number %s", (value) => {
  expect(isInteger(value)).toBe(false);
});
