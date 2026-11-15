import { describe, expect, test } from "vitest";

import { splitLast } from "@auaust/toolkit/string";

describe("splitLast", () => {
  test("splits around the last occurrence", () => {
    expect(splitLast("a.b.c", ".")).toEqual(["a.b", "c"]);
  });

  test("returns the string and an empty string for a missing needle", () => {
    expect(splitLast("abc", ".")).toEqual(["abc", ""]);
  });
});
