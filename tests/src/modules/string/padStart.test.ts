import { describe, expect, expectTypeOf, test } from "vitest";

import { padStart } from "@auaust/toolkit/string";

describe("padStart", () => {
  test("pads the start", () => {
    expect(padStart("a", 3)).toBe("  a");
    expect(padStart("a", 3, "0")).toBe("00a");
    expectTypeOf(padStart("a", 3)).toEqualTypeOf<string>();
  });

  test("leaves the string unchanged with an empty filler", () => {
    expect(padStart("a", 3, "")).toBe("a");
    expect(padStart(undefined, 3)).toBeUndefined();
  });
});
