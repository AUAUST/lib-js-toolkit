import { describe, expect, test } from "vitest";

import { whenPlainObject } from "@auaust/toolkit";

describe("whenPlainObject", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenPlainObject({}, true, false)).toBe(true);
    expect(whenPlainObject(new Date(), true, false)).toBe(false);
  });
});
