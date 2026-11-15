import { describe, expect, test } from "vitest";

import { trimEnd } from "@auaust/toolkit/string";

describe("trimEnd", () => {
  test("trims the end only", () => {
    expect(trimEnd("  a  ")).toBe("  a");
    expect(trimEnd("--a--", { chars: "-" })).toBe("--a");
  });
});
