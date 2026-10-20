import { ownDescriptor } from "@auaust/toolkit/object";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("ownDescriptor", () => {
  test("infers known values and permits undeclared keys", () => {
    const target = {
      value: 1,
    };
    const result = ownDescriptor(target, "value");

    expectTypeOf(result).toEqualTypeOf<TypedPropertyDescriptor<number> | undefined>();
    expectTypeOf(ownDescriptor(target, "missing")).toEqualTypeOf<TypedPropertyDescriptor<any> | undefined>();
    expect(ownDescriptor).toBe(Object.getOwnPropertyDescriptor);
    expect(result?.value).toBe(1);
    expect(ownDescriptor(target, "missing")).toBeUndefined();
  });
});
