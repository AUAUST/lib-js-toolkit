import { describe, expect, expectTypeOf, test } from "vitest";

import { getOrCreate } from "@auaust/toolkit/object";

import { createObjects } from "../../fixtures/values";

describe("getOrCreate", () => {
  test.for(createObjects())("accepts native target %s", (target) => {
    const result = getOrCreate(target, "fixture", Map<string, number>);

    expect(result).toBeInstanceOf(Map);
    expect(getOrCreate(target, "fixture", Map)).toBe(result);
    expectTypeOf(result).toEqualTypeOf<Map<string, number>>();
  });

  test("infers the instance and reuses existing values", () => {
    const target = {};
    const result = getOrCreate(target, "items", Map<string, number>);

    expectTypeOf(result).toEqualTypeOf<Map<string, number>>();
    expect(result).toBeInstanceOf(Map);
    expect(getOrCreate(target, "items", Map)).toBe(result);
  });

  test("preserves present and optional types", () => {
    const target: { value?: number } = {};

    const present = {
      value: undefined,
    };

    expectTypeOf(getOrCreate(target, "value", Date)).toEqualTypeOf<
      number | Date | undefined
    >();
    expectTypeOf(
      getOrCreate(present, "value", Date),
    ).toEqualTypeOf<undefined>();
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
});
