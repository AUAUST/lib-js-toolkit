import { describe, expect, expectTypeOf, test } from "vitest";

import { filterMap } from "@auaust/toolkit/array";
import { isString } from "@auaust/toolkit/guard";
import type { Maybe } from "@auaust/toolkit/types";

describe("filterMap", () => {
  const items = [
    { label: "a", size: 1 },
    { label: undefined, size: 2 },
    { label: null, size: 3 },
  ];

  test("drops undefined results but keeps null, with a mapper", () => {
    const result = filterMap(items, ({ label }) => label);

    expect(result).toEqual(["a", null]);
    expectTypeOf(result).toEqualTypeOf<(string | null)[]>();
  });

  test("drops undefined results but keeps null, with a property name", () => {
    const result = filterMap(items, "label");

    expect(result).toEqual(["a", null]);
    expectTypeOf(result).toEqualTypeOf<(string | null)[]>();
  });

  test("drops undefined results but keeps null, after a predicate", () => {
    expect(filterMap(items, ({ size }) => size > 1, "label")).toEqual([null]);

    expect(
      filterMap(
        items,
        ({ size }) => size < 3,
        ({ label }) => label,
      ),
    ).toEqual(["a"]);
  });

  test("narrows with a type predicate before mapping", () => {
    const values = ["a", 1, "bc", null];
    const lengths = filterMap(values, isString, (value) => value.length);

    expect(lengths).toEqual([1, 2]);
    expectTypeOf(lengths).toEqualTypeOf<number[]>();
    expect(filterMap(values, isString, "length")).toEqual([1, 2]);
  });

  test("passes nullish through and rejects invalid arguments", () => {
    expect(filterMap(null, String)).toBeUndefined();
    expect(() => filterMap([1], true as never)).toThrow(TypeError);
    expect(() => filterMap([1], "x" as never, String)).toThrow(TypeError);

    expectTypeOf(filterMap([1] as Maybe<number[]>, String)).toEqualTypeOf<
      string[] | undefined
    >();
  });
});
