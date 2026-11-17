import { describe, expect, expectTypeOf, test } from "vitest";

import { splitNth } from "@auaust/toolkit/string";

describe("splitNth", () => {
  test("splits around the occurrence at the position", () => {
    expect(splitNth("a.b.c", ".", 1)).toEqual(["a.b", "c"]);
    expect(splitNth("a.b.", ".", 1)).toEqual(["a.b", ""]);
    expect(splitNth("a.b.c", ".", -2)).toEqual(["a", "b.c"]);

    expectTypeOf(splitNth("a.b", ".", 0)).toEqualTypeOf<
      [string, string | undefined]
    >();
  });

  test("returns undefined after the string for a missing occurrence", () => {
    expect(splitNth("abc", ".", 0)).toEqual(["abc", undefined]);
    expect(splitNth("a.b.c", ".", 2)).toEqual(["a.b.c", undefined]);
  });

  test("throws a RangeError for a non-integer position", () => {
    expect(() => splitNth("a.b.c", ".", 0.5)).toThrow(RangeError);
    expect(() => splitNth(null, ".", 0.5)).toThrow(RangeError);
  });
});
