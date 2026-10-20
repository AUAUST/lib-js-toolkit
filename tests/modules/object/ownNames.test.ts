import { ownNames } from "@auaust/toolkit/object";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("ownNames", () => {
  test("infers known string keys", () => {
    const target = {
      value: 1,
      [Symbol("key")]: 2,
    };

    const result = ownNames(target);

    expectTypeOf(result).toEqualTypeOf<"value"[]>();
    expect(result).toContain("value");
    expect(ownNames(undefined!)).toEqual([]);
  });
});
