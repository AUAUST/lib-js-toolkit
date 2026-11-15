import { describe, expect, expectTypeOf, test } from "vitest";

import { wrap } from "@auaust/toolkit/string";

describe("wrap", () => {
  test("wraps with the same string on both sides", () => {
    expect(wrap("a", '"')).toBe('"a"');
    expectTypeOf(wrap("a", '"')).toEqualTypeOf<string>();
  });

  test("wraps with distinct before and after", () => {
    expect(wrap("a", "(", ")")).toBe("(a)");
    expect(wrap(undefined, "(", ")")).toBeUndefined();
  });
});
