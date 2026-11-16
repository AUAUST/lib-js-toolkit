import { describe, expect, test } from "vitest";

import { truncateStart } from "@auaust/toolkit/string";

describe("truncateStart", () => {
  test("cuts the start by code points", () => {
    expect(truncateStart("😀😀😀", 2)).toBe("😀😀");
    expect(truncateStart("abcdef", 4, "…")).toBe("…def");
    expect(truncateStart(null, 2)).toBeUndefined();
  });
});
