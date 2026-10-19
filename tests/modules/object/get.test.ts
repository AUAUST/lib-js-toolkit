import { get } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("get() preserves known values and permits undeclared or dynamic keys", () => {
  const key = Symbol("value");
  const target = {
    name: "entry" as const,
    1: 42,
    [key]: true,
  };

  expectTypeOf(get(target, "name")).toEqualTypeOf<"entry">();
  expectTypeOf(get(target, "1")).toEqualTypeOf<number>();
  expectTypeOf(get(target, key)).toEqualTypeOf<boolean>();
  expectTypeOf(get(target, "missing")).toBeAny();
  expectTypeOf(get(target, "dynamic" as string)).toBeAny();
  expectTypeOf(get(target as unknown, "name")).toBeAny();
  expectTypeOf(get<string>(target as unknown, "name")).toEqualTypeOf<string>();

  expect(get(target, "name")).toBe("entry");
  expect(get(target, "missing")).toBeUndefined();
  expect(get("hello", "length")).toBe(5);
});

test("get() preserves optional, union, and nullish property types", () => {
  const optional: { value?: number } = {};
  const union = {
    value: 1,
  } as { value: number } | { value: string } | null;

  expectTypeOf(get(optional, "value")).toEqualTypeOf<number | undefined>();
  expectTypeOf(get(union, "value")).toEqualTypeOf<number | string | undefined>();
  expectTypeOf(get(null, "value")).toEqualTypeOf<undefined>();
  expectTypeOf(get(undefined, "value")).toEqualTypeOf<undefined>();

  expect(get(null, "value")).toBeUndefined();
  expect(get(undefined, "value")).toBeUndefined();
  expect(get(["first"] as const, 0)).toBe("first");
});
