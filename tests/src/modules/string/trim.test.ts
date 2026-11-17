import { describe, expect, expectTypeOf, test } from "vitest";

import { trim } from "@auaust/toolkit/string";

describe("trim", () => {
  test("trims whitespace or the given characters", () => {
    expect(trim("  a  ")).toBe("a");
    expect(trim("--a--", { chars: "-" })).toBe("a");
    expectTypeOf(trim("a")).toEqualTypeOf<string>();
    expect(trim(null)).toBeUndefined();
  });

  test("treats the characters literally", () => {
    expect(trim("a.", { chars: "." })).toBe("a");
    expect(trim("ab", { chars: "." })).toBe("ab");
  });

  test("accepts the characters alone", () => {
    expect(trim("//a//", "/")).toBe("a");
    expect(trim("//a//", "/")).toBe(trim("//a//", { chars: "/" }));
  });
});
