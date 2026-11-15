import { describe, expect, test } from "vitest";

import { padEnd } from "@auaust/toolkit/string";

describe("padEnd", () => {
  test("pads the end", () => {
    expect(padEnd("a", 3, "-")).toBe("a--");
    expect(padEnd("a", 3, "")).toBe("a");
  });
});
