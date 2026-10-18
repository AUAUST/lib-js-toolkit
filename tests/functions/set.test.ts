import { set } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("set() extends the returned type and replaces conflicting types", () => {
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

test("set() preserves setter behavior and assignment errors", () => {
  let stored = 0;

  const target = {
    set value(next: number) {
      stored = next;
    },
  };

  expect(set(target, "value", 2)).toBe(target);
  expect(stored).toBe(2);
  expect(() => set(Object.freeze({}), "value", 1)).toThrow(TypeError);
});
