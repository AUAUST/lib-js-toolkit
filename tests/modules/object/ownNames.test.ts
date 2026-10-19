import { ownNames } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("ownNames() infers known string keys", () => {
  const target = {
    value: 1,
    [Symbol("key")]: 2,
  };

  const result = ownNames(target);

  expectTypeOf(result).toEqualTypeOf<"value"[]>();

  expect(result).toContain("value");

  expect(ownNames(undefined!)).toEqual([]);
});
