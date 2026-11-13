import { expect, expectTypeOf, test } from "vitest";

import { a, toArray } from "@auaust/toolkit/array";

test("covers the conversion table", () => {
  const symbol = Symbol("s");
  const fn = () => 1;
  const object = {};
  const arrayLike = { length: 2 };

  expect(toArray(null)).toEqual([]);
  expect(toArray(undefined)).toEqual([]);
  expect(toArray("abc")).toEqual(["abc"]);
  expect(toArray("")).toEqual([""]);
  expect(toArray(3)).toEqual([3]);
  expect(toArray(0)).toEqual([0]);
  expect(toArray(1n)).toEqual([1n]);
  expect(toArray(false)).toEqual([false]);
  expect(toArray(symbol)).toEqual([symbol]);
  expect(toArray(fn)).toEqual([fn]);
  expect(toArray(object)[0]).toBe(object);
  expect(toArray(arrayLike)).toEqual([{ length: 2 }]);
});

test("returns arrays as is and drains other iterables", () => {
  const input = [1, 2];

  expect(toArray(input)).toBe(input);
  expect(toArray(new Set([1, 2]))).toEqual([1, 2]);
  expect(toArray(new Map([["a", 1]]))).toEqual([["a", 1]]);

  expect(
    toArray(
      (function* () {
        yield 1;

        yield 2;
      })(),
    ),
  ).toEqual([1, 2]);
});

test("infers each overload and shares its shorthand", () => {
  expect(a).toBe(toArray);
  expectTypeOf(toArray(["a"] as const)).toEqualTypeOf<readonly ["a"]>();
  expectTypeOf(toArray(null)).toEqualTypeOf<[]>();
  expectTypeOf(toArray(new Set<number>())).toEqualTypeOf<number[]>();
  expectTypeOf(toArray("a")).toEqualTypeOf<string[]>();
});
