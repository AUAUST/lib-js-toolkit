import { afterEach, describe, expect, expectTypeOf, test } from "vitest";

import { expose } from "@auaust/toolkit";

import { createObjects, primitiveValues } from "../fixtures/values";

describe("expose", () => {
  const key = Symbol("exposed");

  afterEach(() => {
    expose.target(globalThis);
    Reflect.deleteProperty(globalThis, key);
  });

  test.each([true, false])(
    "exposes on the global target when %s",
    (condition) => {
      expect(expose(key, 42, condition)).toBe(42);
      expect(Reflect.get(globalThis, key)).toBe(condition ? 42 : undefined);
    },
  );

  test.for(createObjects())("accepts native target %s", (target) => {
    const result = expose(key, "value" as const, true, target);

    expect(Reflect.get(target, key)).toBe("value");
    expect(Reflect.has(globalThis, key)).toBe(false);
    expectTypeOf(result).toEqualTypeOf<"value">();
  });

  test.for(primitiveValues)("preserves exposed value %s", (value) => {
    const target = {};

    const pairs = {
      first: value,
      second: 2,
    };

    expect(expose(pairs, true, target)).toBe(pairs);
    expect(target).toEqual(pairs);
    expectTypeOf(expose(pairs, false, target)).toEqualTypeOf<typeof pairs>();
    expect(expose("absent", value, false, target)).toBe(value);
    expect(Reflect.has(target, "absent")).toBe(false);
  });

  describe("target", () => {
    test("sets the default for subsequent single and multiple exposures", () => {
      const target = {};

      expectTypeOf(expose.target)
        .parameter(0)
        .toEqualTypeOf<Record<PropertyKey, any>>();

      expose.target(target);

      expose("first", 1);

      expose({
        second: 2,
      });

      expect(target).toEqual({
        first: 1,
        second: 2,
      });
    });
  });
});
