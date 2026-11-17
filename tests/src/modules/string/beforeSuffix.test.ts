import { describe, expect, expectTypeOf, test } from "vitest";

import { beforeSuffix } from "@auaust/toolkit/string";

describe("beforeSuffix", () => {
  test("returns the rest before the suffix", () => {
    expect(beforeSuffix("a/root", "/root")).toBe("a");
    expect(beforeSuffix("/root", "/root")).toBe("");

    expectTypeOf(beforeSuffix("a/root", "/root")).toEqualTypeOf<
      string | undefined
    >();
  });

  test("returns undefined for a missing suffix or a nullish string", () => {
    expect(beforeSuffix("/other", "/root")).toBeUndefined();
    expect(beforeSuffix(undefined, "/root")).toBeUndefined();
  });
});
