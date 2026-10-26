import { describe, expect, expectTypeOf, test } from "vitest";

import { set } from "@auaust/toolkit/object";

import { createObjects } from "../../fixtures/values";

describe("set", () => {
  test.for(createObjects())("accepts native target %s", (target) => {
    const key = Symbol("fixture");
    const result = set(target, key, "value" as const);

    expect(result).toBe(target);
    expect(result[key]).toBe("value");
    expectTypeOf(result[key]).toEqualTypeOf<"value">();
  });

  test("extends the returned type and replaces conflicting types", () => {
    const key = Symbol("key");

    const target = {
      value: 1,
      retained: true,
    };

    const result = set(target, "value", "changed" as const);
    const extended = set(result, key, 42);

    expectTypeOf(result.value).toEqualTypeOf<"changed">();
    expectTypeOf(result.retained).toEqualTypeOf<boolean>();
    expectTypeOf(extended[key]).toEqualTypeOf<number>();
    expect(result).toBe(target);
    expect(extended[key]).toBe(42);
    expect(result.value).toBe("changed");
  });

  test("preserves setter behavior and assignment errors", () => {
    let stored = 0;

    const target = {
      set value(next: number) {
        stored = next;
      },
    };

    expect(set(target, "value", 2)).toBe(target);
    expect(stored).toBe(2);
    expect(() => {
      return set(Object.freeze({}), "value", 1);
    }).toThrow(TypeError);
  });
});
