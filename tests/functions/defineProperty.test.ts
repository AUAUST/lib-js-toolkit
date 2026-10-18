import { defineProperty } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("defineProperty() infers values, writability, and replaced property types", () => {
  const target = {
    value: 1,
  };

  const result = defineProperty(target, "value", {
    value: "changed",
    writable: true,
  });
  const locked = defineProperty(result, "locked", {
    value: 42,
  });

  expectTypeOf(result.value).toEqualTypeOf<"changed">();
  expectTypeOf(locked.locked).toEqualTypeOf<42>();

  expect(defineProperty).toBe(Object.defineProperty);
  expect(result).toBe(target);
  expect(result.value).toBe("changed");

  if (false) {
    // @ts-expect-error Properties default to non-writable.
    locked.locked = 42;
  }
});

test("defineProperty() infers accessors and supports symbol keys", () => {
  let stored = 1;
  const key = Symbol("value");

  const result = defineProperty({}, key, {
    get() {
      return stored;
    },
    set(next: number) {
      stored = next;
    },
  });

  expectTypeOf(result[key]).toEqualTypeOf<number>();

  result[key] = 2;

  expect(stored).toBe(2);
});

test("defineProperty() preserves the value type when only flags change", () => {
  const target = {
    value: 1,
  };

  const result = defineProperty(target, "value", {
    writable: false,
  });

  expectTypeOf(result.value).toEqualTypeOf<number>();

  expect(result.value).toBe(1);
});

test("defineProperty() contextually types the accessor receiver", () => {
  const result = defineProperty({
    count: 2,
  }, "doubled", {
    get() {
      return this.count * 2;
    },
  });

  expectTypeOf(result.doubled).toEqualTypeOf<number>();

  expect(result.doubled).toBe(4);
});
