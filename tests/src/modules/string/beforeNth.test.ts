import { describe, expect, test } from "vitest";

import { beforeNth } from "@auaust/toolkit/string";

describe("beforeNth", () => {
  test("returns the part before the occurrence at the position", () => {
    expect(beforeNth("a.b.c", ".", 0)).toBe("a");
    expect(beforeNth("a.b.c", ".", -1)).toBe("a.b");
  });

  test("returns undefined for a missing occurrence", () => {
    expect(beforeNth("a.b.c", ".", 2)).toBeUndefined();
  });

  test("throws a RangeError for a non-integer position", () => {
    expect(() => beforeNth("a.b.c", ".", 0.5)).toThrow(RangeError);
    expect(() => beforeNth(null, ".", 0.5)).toThrow(RangeError);
  });
});
