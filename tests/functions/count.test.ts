import { count } from "@auaust/toolkit";
import { countOf } from "@auaust/toolkit/protocols/countable";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("count()", () => {
  test("counts strings and arrays using their length", () => {
    expect(count("")).toBe(0);
    expect(count("toolkit")).toBe(7);
    expect(count([])).toBe(0);
    expect(count([1, 2, 3])).toBe(3);

    const sparse = Array(3);

    expect(count(sparse)).toBe(3);
  });

  test("counts Map and Set entries using their size", () => {
    expect(count(new Map())).toBe(0);
    expect(count(new Map([["key", "value"]]))).toBe(1);
    expect(count(new Set())).toBe(0);
    expect(count(new Set([1, 1, 2]))).toBe(2);
  });

  test("counts own enumerable string keys on plain objects", () => {
    const inherited = { inherited: true };

    const value = Object.assign(Object.create(inherited), {
      first: 1,
      second: 2,
    });

    // Objects with custom prototypes are intentionally not treated as records.
    expect(count(value)).toBeUndefined();

    const record = Object.create(null);
    record.first = 1;
    record.second = 2;
    Object.defineProperty(record, "hidden", { value: 3 });
    record[Symbol("symbol-key")] = 4;

    expect(count({})).toBe(0);
    expect(count({ first: 1, second: 2 })).toBe(2);
    expect(count(record)).toBe(2);
  });

  test("uses the Countable protocol before built-in behavior", () => {
    const value = {
      items: [1, 2, 3],
      [countOf]() {
        expect(this).toBe(value);
        return this.items.length;
      },
    };

    expect(count(value)).toBe(3);
  });

  test("rejects invalid counts returned by the Countable protocol", () => {
    for (const result of [
      -1,
      1.5,
      NaN,
      Infinity,
      Number.MAX_SAFE_INTEGER + 1,
    ]) {
      expect(() => count({ [countOf]: () => result })).toThrow(RangeError);
    }
  });

  test("returns undefined for values without a meaningful count", () => {
    const unsupported = [
      null,
      undefined,
      true,
      0,
      42n,
      Symbol("value"),
      () => {},
      new Date(),
      /pattern/,
      new WeakMap(),
      new WeakSet(),
    ];

    for (const value of unsupported) {
      expect(count(value)).toBeUndefined();
    }
  });

  test("always returns a number for supported values", () => {
    expectTypeOf(count([])).toEqualTypeOf<number>();
    expectTypeOf(count("")).toEqualTypeOf<number>();
    expectTypeOf(count(new Map())).toEqualTypeOf<number>();
    expectTypeOf(count(new Set())).toEqualTypeOf<number>();
    expectTypeOf(count(new Uint8Array())).toEqualTypeOf<number>();
  });
});
