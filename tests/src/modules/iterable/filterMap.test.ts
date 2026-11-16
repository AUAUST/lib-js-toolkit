import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { isString } from "@auaust/toolkit/guard";
import { filterMap } from "@auaust/toolkit/iterable";
import type { Maybe } from "@auaust/toolkit/types";

describe("filterMap", () => {
  const items = [
    { label: "a", size: 1 },
    { label: undefined, size: 2 },
    { label: null, size: 3 },
  ];

  test("drops undefined results but keeps null, with a mapper", () => {
    const result = filterMap(items, ({ label }) => label);

    expect([...result]).toEqual(["a", null]);

    expectTypeOf(result).toEqualTypeOf<
      IteratorObject<string | null, undefined>
    >();
  });

  test("drops undefined results but keeps null, with a property name", () => {
    const result = filterMap(items, "label");

    expect([...result]).toEqual(["a", null]);

    expectTypeOf(result).toEqualTypeOf<
      IteratorObject<string | null, undefined>
    >();
  });

  test("selects with a predicate before mapping, sharing the source index", () => {
    const predicate = vi.fn(({ size }: { size: number }) => size > 1);
    const mapper = vi.fn((_: unknown, index: number) => index);

    expect([...filterMap(items, predicate, mapper)]).toEqual([1, 2]);
    expect(predicate).toHaveBeenCalledTimes(3);
    expect(mapper.mock.calls.map(([, index]) => index)).toEqual([1, 2]);

    expect([...filterMap(items, ({ size }) => size > 1, "label")]).toEqual([
      null,
    ]);
  });

  test("narrows with a guard wider than the item type", () => {
    const values = ["a", 1] as ("a" | 1)[];

    expectTypeOf(filterMap(values, isString, "length")).toEqualTypeOf<
      IteratorObject<number, undefined>
    >();

    expectTypeOf(filterMap(values, isString, (value) => value)).toEqualTypeOf<
      IteratorObject<"a", undefined>
    >();
  });

  test("narrows with a type predicate before mapping", () => {
    const values = ["a", 1, "bc", undefined];
    const lengths = filterMap(values, isString, (value) => value.length);

    expect([...lengths]).toEqual([1, 2]);
    expectTypeOf(lengths).toEqualTypeOf<IteratorObject<number, undefined>>();

    const named = filterMap(values, isString, "length");

    expect([...named]).toEqual([1, 2]);
    expectTypeOf(named).toEqualTypeOf<IteratorObject<number, undefined>>();
  });

  test("accepts only a property name every union member has", () => {
    const union: ({ id: number } | { id: number; active: boolean })[] = [];

    filterMap(union, "id");

    // @ts-expect-error `active` is missing from one member of the union
    filterMap(union, "active");
  });

  test("runs nothing before iteration and closes its source on break", () => {
    let closed = false;

    const mapper = vi.fn((value: number) => value);

    function* source() {
      try {
        yield 1;

        yield 2;
      } finally {
        closed = true;
      }
    }

    const result = filterMap(source(), mapper);

    expect(mapper).not.toHaveBeenCalled();

    const [first] = result;

    expect(first).toBe(1);
    expect(closed).toBe(true);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    expect(() => filterMap([1], true as never)).toThrow(TypeError);
    expect(() => filterMap([1], {} as never, String)).toThrow(TypeError);
    expect(() => filterMap(42 as never, String)).toThrow(TypeError);
    expect(filterMap(null, String)).toBeUndefined();

    expectTypeOf(filterMap([1] as Maybe<number[]>, String)).toEqualTypeOf<
      IteratorObject<string, undefined> | undefined
    >();
  });

  test("selects with a property name before mapping", () => {
    const entries = [
      {
        default: true,
        name: "a",
        active: () => false,
      },
      {
        default: false,
        name: "b",
        active: () => true,
      },
    ];

    const names = filterMap(entries, "default", "name");

    expect([...names]).toEqual(["a"]);
    expectTypeOf(names).toEqualTypeOf<IteratorObject<string, undefined>>();

    expect([...filterMap(entries, "active", ({ name }) => name)]).toEqual([
      "b",
    ]);

    expect(() => filterMap([1], true as never, String)).toThrow(TypeError);
  });
});
