import { describe, expect, test } from "vitest";

import { beforeLast } from "@auaust/toolkit/string";

describe("beforeLast", () => {
  test("returns the part before the last occurrence", () => {
    expect(beforeLast("a.b.c", ".")).toBe("a.b");
  });

  test("returns undefined for a missing needle", () => {
    expect(beforeLast("abc", ".")).toBeUndefined();
  });
});
