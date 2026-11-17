import { describe, expect, test } from "vitest";

import { withoutSuffix } from "@auaust/toolkit/string";

describe("withoutSuffix", () => {
  test("removes the suffix", () => {
    expect(withoutSuffix("foobar", "bar")).toBe("foo");
  });

  test("returns the string unchanged when the suffix is absent", () => {
    expect(withoutSuffix("foo", "x")).toBe("foo");
    expect(withoutSuffix("foo", "")).toBe("foo");
  });
});
