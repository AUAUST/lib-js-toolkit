import { create } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("create() infers prototype properties and descriptor values", () => {
  const prototype = {
    inherited: 1,
  };

  const result = create(prototype, {
    own: {
      value: "entry",
      writable: true,
      enumerable: true,
    },
  });

  expectTypeOf(result.inherited).toEqualTypeOf<number>();
  expectTypeOf(result.own).toEqualTypeOf<"entry">();

  expect(create).toBe(Object.create);
  expect(Object.getPrototypeOf(result)).toBe(prototype);
  expect(result.own).toBe("entry");
  expect(Object.hasOwn(result, "inherited")).toBe(false);
});

test("create() supports extensible null-prototype objects", () => {
  const empty = create(null);
  const typed = create<{ value: number }>(null);

  typed.value = 1;

  expectTypeOf(typed.value).toEqualTypeOf<number>();
  const described = create(null, {
    value: {
      value: 1,
    },
  });

  empty.dynamic = 1;

  expectTypeOf(empty.dynamic).toBeAny();
  expectTypeOf(described.value).toEqualTypeOf<1>();

  expect(Object.getPrototypeOf(empty)).toBeNull();
  expect(described.value).toBe(1);
});
