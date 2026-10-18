import { proto } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("proto() permits an explicit prototype type", () => {
  const target = {
    inherited: 1,
  };

  expectTypeOf(proto<typeof target>({})).toEqualTypeOf<typeof target | null>();
  expectTypeOf(proto({})).toBeAny();

  expect(proto).toBe(Object.getPrototypeOf);
  expect(proto(Object.create(target))).toBe(target);
  expect(proto(Object.create(null))).toBeNull();
});
