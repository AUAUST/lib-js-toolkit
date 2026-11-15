import { describe, expect, test } from "vitest";

import { trimStart } from "@auaust/toolkit/string";

describe("trimStart", () => {
  test("trims the start only", () => {
    expect(trimStart("  a  ")).toBe("a  ");
    expect(trimStart("--a--", { chars: "-" })).toBe("a--");
  });
});
