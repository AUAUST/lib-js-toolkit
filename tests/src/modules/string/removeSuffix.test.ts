import { describe, expect, test } from "vitest";

import { removeSuffix } from "@auaust/toolkit/string";

describe("removeSuffix", () => {
  test("removes the suffix", () => {
    expect(removeSuffix("foobar", "bar")).toBe("foo");
  });

  test("returns the string unchanged when the suffix is absent", () => {
    expect(removeSuffix("foo", "x")).toBe("foo");
    expect(removeSuffix("foo", "")).toBe("foo");
  });
});
