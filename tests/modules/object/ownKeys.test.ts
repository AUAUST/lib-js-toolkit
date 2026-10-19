import { ownKeys } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("ownKeys() infers known keys", () => {
  const target = {
    value: 1,
    [Symbol("key")]: 2,
  };

  const result = ownKeys(target);

  expectTypeOf(result).toEqualTypeOf<("value" | symbol)[]>();

  expect(result).toContain("value");

  expect(ownKeys(undefined!)).toEqual([]);
});
