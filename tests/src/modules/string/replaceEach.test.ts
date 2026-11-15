import { describe, expect, expectTypeOf, test } from "vitest";

import { replaceEach } from "@auaust/toolkit/string";

describe("replaceEach", () => {
  test("applies the entries in order", () => {
    expect(
      replaceEach("ab", [
        ["a", "b"],
        ["b", "c"],
      ]),
    ).toBe("cb");

    expect(replaceEach("a1", [[/\d/, "#"]])).toBe("a#");
    expectTypeOf(replaceEach("a", { a: "b" })).toEqualTypeOf<string>();
  });

  test("replaces every substring occurrence with all", () => {
    expect(replaceEach("aa", { a: "b" })).toBe("ba");
    expect(replaceEach("aa", { a: "b" }, { all: true })).toBe("bb");
    expect(replaceEach(null, { a: "b" })).toBeNull();
  });
});
