import { getOwnPropertyDescriptor } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("getOwnPropertyDescriptor() infers known values and permits undeclared keys", () => {
  const target = {
    value: 1,
  };
  const result = getOwnPropertyDescriptor(target, "value");

  expectTypeOf(result).toEqualTypeOf<TypedPropertyDescriptor<number> | undefined>();
  expectTypeOf(getOwnPropertyDescriptor(target, "missing"))
    .toEqualTypeOf<TypedPropertyDescriptor<any> | undefined>();

  expect(getOwnPropertyDescriptor).toBe(Object.getOwnPropertyDescriptor);
  expect(result?.value).toBe(1);
  expect(getOwnPropertyDescriptor(target, "missing")).toBeUndefined();
});
