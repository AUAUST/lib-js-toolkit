import { describe, expect, expectTypeOf, test } from "vitest";

import { insert } from "@auaust/toolkit/string";

describe("insert", () => {
  test("counts a negative position from the end", () => {
    expect(insert("abc", -1, "x")).toBe("abxc");
    expectTypeOf(insert("abc", -1, "x")).toEqualTypeOf<string>();
  });

  test("inserts at the end", () => {
    expect(insert("abc", 3, "x")).toBe("abcx");
    expect(insert(null, 3, "x")).toBeNull();
  });
});
