import { describe, expect, expectTypeOf, test } from "vitest";

import { remove } from "@auaust/toolkit/string";

describe("remove", () => {
  test("removes every match", () => {
    expect(remove("a1b2", /\d/)).toBe("ab");
    expect(remove("a1b2", /\d/g)).toBe("ab");
    expect(remove("a.b.", ".")).toBe("ab");
    expectTypeOf(remove("a", "a")).toEqualTypeOf<string>();
  });

  test("returns nullish input as is", () => {
    expect(remove(undefined, "a")).toBeUndefined();
  });
});
