import { describe, expect, expectTypeOf, test } from "vitest";

import { truncateEnd } from "@auaust/toolkit/string";

describe("truncateEnd", () => {
  test("keeps whole code points", () => {
    expect(truncateEnd("😀😀😀", 2)).toBe("😀😀");
    expect(truncateEnd("abcdef", 4, "…")).toBe("abc…");
    expect(truncateEnd("abc", 3, "…")).toBe("abc");
    expectTypeOf(truncateEnd("abc", 2)).toEqualTypeOf<string>();
  });

  test("throws a RangeError for an ellipsis as long as the length", () => {
    expect(() => truncateEnd("abc", 1, "…")).toThrow(RangeError);
    expect(() => truncateEnd("abc", -1)).toThrow(RangeError);
  });
});
