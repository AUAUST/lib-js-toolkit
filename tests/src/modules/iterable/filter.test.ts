import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { isString } from "@auaust/toolkit/guard";
import { filter } from "@auaust/toolkit/iterable";

describe("filter", () => {
  test("keeps accepted values lazily, indexing every value read", () => {
    const predicate = vi.fn((value: number) => value % 2 === 0);
    const result = filter([1, 2, 3, 4], predicate);

    expect(predicate).toHaveBeenCalledTimes(0);
    expect([...result]).toEqual([2, 4]);

    expect(predicate.mock.calls).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
    ]);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    expect(() => filter([1], true as never)).toThrow(TypeError);
    expect(() => filter(42 as never, Boolean)).toThrow(TypeError);
    expect(filter(null, Boolean)).toBeUndefined();
  });

  test("narrows with a type predicate", () => {
    const result = filter([1, "a"], isString);

    expect([...result]).toEqual(["a"]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<string, undefined>>();

    expectTypeOf(filter([1, 2], Boolean)).toEqualTypeOf<
      IteratorObject<number, undefined>
    >();
  });

  test("narrows with a guard wider than the value type", () => {
    const values = ["a", 1] as ("a" | 1)[];

    expectTypeOf(filter(values, isString)).toEqualTypeOf<
      IteratorObject<"a", undefined>
    >();
  });

  test("keeps values whose named member is truthy", () => {
    const items = [
      { active: true, id: 1 },
      { active: false, id: 2 },
      { active: 1, id: 3 },
    ];

    const result = filter(items, "active");

    expect([...result]).toEqual([items[0], items[2]]);

    expectTypeOf(result).toEqualTypeOf<
      IteratorObject<(typeof items)[number], undefined>
    >();

    const methods = [{ isOn: () => true }, { isOn: () => 0 }];

    expect([...filter(methods, "isOn")]).toEqual([methods[0]]);
  });

  test("accepts only a property name every union member has", () => {
    const items: ({ id: number } | { id: number; active: boolean })[] = [];

    filter(items, "id");

    // @ts-expect-error `active` is missing from one member of the union
    filter(items, "active");
  });
});
