import { describe, expect, test } from "vitest";

import { getTag } from "@auaust/toolkit/object";

describe("getTag", () => {
  test("reads the native tag", () => {
    expect(getTag([])).toBe("[object Array]");
  });

  test("follows Symbol.toStringTag", () => {
    expect(getTag({ [Symbol.toStringTag]: "Custom" })).toBe("[object Custom]");
  });
});
