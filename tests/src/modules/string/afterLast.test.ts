import { describe, expect, test } from "vitest";

import { afterLast } from "@auaust/toolkit/string";

describe("afterLast", () => {
  test("returns the part after the last occurrence", () => {
    expect(afterLast("a.b.c", ".")).toBe("c");
  });

  test("returns undefined for a missing needle", () => {
    expect(afterLast("abc", ".")).toBeUndefined();
  });
});
