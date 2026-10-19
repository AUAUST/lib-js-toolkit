import { defineGetter } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("defineGetter() preserves the target and infers the getter value", () => {
  const key = Symbol("computed");
  const target = {
    count: 2,
  };

  const result = defineGetter(target, key, function () {
    expectTypeOf(this).toEqualTypeOf<typeof target>();

    return this.count * 2;
  });

  expectTypeOf(result[key]).toEqualTypeOf<number>();
  expectTypeOf(result.count).toEqualTypeOf<number>();

  expect(result).toBe(target);
  expect(result[key]).toBe(4);

  expect(Object.getOwnPropertyDescriptor(result, key)).toEqual({
    get: expect.any(Function),
    set: undefined,
    enumerable: true,
    configurable: true,
  });
});

test("defineGetter() replaces the previous property type", () => {
  const result = defineGetter({
    value: 1,
  }, "value", () => "computed" as const);

  expectTypeOf(result.value).toEqualTypeOf<"computed">();

  expect(result.value).toBe("computed");

  if (false) {
    // @ts-expect-error A getter without a setter is readonly.
    result.value = "computed";
  }
});
