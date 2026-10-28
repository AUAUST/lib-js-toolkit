import { describe, expect, expectTypeOf, test } from "vitest";

import { count } from "@auaust/toolkit";
import { assign, create, defineProperty } from "@auaust/toolkit/object";
import { countOf } from "@auaust/toolkit/protocols/countable";

import { createFunctions, primitiveValues } from "../fixtures/values";

describe("count", () => {
  test.each([
    ["", 0],
    ["toolkit", 7],
    [[], 0],
    [[1, 2, 3], 3],
    [
      Array.from({
        length: 3,
      }),
      3,
    ],
    [new Map(), 0],
    [new Map([["key", "value"]]), 1],
    [new Set(), 0],
    [new Set([1, 1, 2]), 2],
    [new Uint8Array(), 0],
    [new Uint8Array([1, 2]), 2],
    [new URLSearchParams("a=1&b=2"), 2],
    [new Blob(["abc"]), 3],
    [new File(["abc"], "fixture.txt"), 3],
  ] as const)("counts %s as %i", (input, expected) => {
    const result = count(input);

    expect(result).toBe(expected);
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  test("counts only own enumerable string keys on plain objects", () => {
    const inherited = assign(
      create({
        inherited: true,
      }),
      {
        first: 1,
        second: 2,
      },
    );

    const record = assign(create(null), {
      first: 1,
      second: 2,
    });

    defineProperty(record, "hidden", {
      value: 3,
    });

    record[Symbol("key")] = 4;

    expect(count(inherited)).toBeUndefined();
    expect(count({})).toBe(0);

    expect(
      count({
        first: 1,
        second: 2,
      }),
    ).toBe(2);

    expect(count(record)).toBe(2);
  });

  test("uses protocol methods with their receiver before native counts", () => {
    const input = {
      length: 99,
      items: [1, 2, 3],
      [countOf]() {
        expect(this).toBe(input);

        return this.items.length;
      },
    };

    expect(count(input)).toBe(3);
  });

  test.each([-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
    "rejects protocol count %s",
    (result) => {
      expect(() => {
        return count({
          [countOf]: () => result,
        });
      }).toThrow(RangeError);
    },
  );

  test.for([
    ...primitiveValues.filter((value) => {
      return typeof value !== "string";
    }),
    ...createFunctions(),
    new Date(0),
    /pattern/,
    new WeakMap(),
    new WeakSet(),
  ])("has no meaningful count for %s", (input) => {
    expect(count(input)).toBeUndefined();
  });
});
