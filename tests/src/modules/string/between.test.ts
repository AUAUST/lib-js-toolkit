import { describe, expect, expectTypeOf, test } from "vitest";

import { between } from "@auaust/toolkit/string";

describe("between", () => {
  test("returns the part from the first start to the last end", () => {
    expect(between("[a][b]", "[", "]")).toBe("a][b");
    expectTypeOf(between("[a]", "[", "]")).toEqualTypeOf<string | undefined>();
  });

  test("returns undefined for a missing needle", () => {
    expect(between("a]", "[", "]")).toBeUndefined();
    expect(between("]a[", "[", "]")).toBeUndefined();
    expect(between("[a", "[", "]")).toBeUndefined();
  });
});
