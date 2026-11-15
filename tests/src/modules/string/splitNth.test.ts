import { describe, expect, test } from "vitest";

import { splitNth } from "@auaust/toolkit/string";

describe("splitNth", () => {
  test("splits around the occurrence at the position", () => {
    expect(splitNth("a.b.c", ".", 1)).toEqual(["a.b", "c"]);
    expect(splitNth("a.b.c", ".", -2)).toEqual(["a", "b.c"]);
  });

  test("returns the string and an empty string for a missing occurrence", () => {
    expect(splitNth("a.b.c", ".", 2)).toEqual(["a.b.c", ""]);
  });

  test("throws a RangeError for a non-integer position", () => {
    expect(() => splitNth("a.b.c", ".", 0.5)).toThrow(RangeError);
    expect(() => splitNth(null, ".", 0.5)).toThrow(RangeError);
  });
});
