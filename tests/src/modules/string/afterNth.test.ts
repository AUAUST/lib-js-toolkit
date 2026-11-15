import { describe, expect, test } from "vitest";

import { afterNth } from "@auaust/toolkit/string";

describe("afterNth", () => {
  test("returns the part after the occurrence at the position", () => {
    expect(afterNth("a.b.c", ".", 0)).toBe("b.c");
    expect(afterNth("a.b.c", ".", -1)).toBe("c");
  });

  test("returns undefined for a missing occurrence", () => {
    expect(afterNth("a.b.c", ".", 2)).toBeUndefined();
  });

  test("throws a RangeError for a non-integer position", () => {
    expect(() => afterNth("a.b.c", ".", 0.5)).toThrow(RangeError);
  });
});
