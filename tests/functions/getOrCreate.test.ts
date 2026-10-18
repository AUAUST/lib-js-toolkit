import { getOrCreate } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("getOrCreate() infers the instance and reuses existing values", () => {
  const target = {};
  const result = getOrCreate(target, "items", Map<string, number>);

  expectTypeOf(result).toEqualTypeOf<Map<string, number>>();

  expect(result).toBeInstanceOf(Map);
  expect(getOrCreate(target, "items", Map)).toBe(result);
});

test("getOrCreate() preserves present and optional types", () => {
  const target: { value?: number } = {};
  const present = {
    value: undefined,
  };

  expectTypeOf(getOrCreate(target, "value", Date)).toEqualTypeOf<
    number | Date | undefined
  >();
  expectTypeOf(getOrCreate(present, "value", Date)).toEqualTypeOf<undefined>();

  expect(getOrCreate(present, "value", Date)).toBeUndefined();
  expect(getOrCreate({}, "toString", Date)).toBe(Object.prototype.toString);

  if (false) {
    class RequiresArgument {
      constructor(value: number) {}
    }

    // @ts-expect-error The constructor is called without arguments.
    getOrCreate({}, "value", RequiresArgument);
  }
});
