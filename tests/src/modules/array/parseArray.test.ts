import { expect, expectTypeOf, test } from "vitest";

import { parseArray } from "@auaust/toolkit/array";
import * as parse from "@auaust/toolkit/parse";

test.for([
  null,
  undefined,
  "abc",
  "",
  3,
  1n,
  true,
  Symbol("s"),
  () => 1,
  {},
  new Date(),
])("rejects non-array input on case %#", (input) => {
  expect(parseArray(input)).toBeUndefined();
});

test("returns arrays as is and reads iterables and array-likes", () => {
  const input = [1, 2];

  expect(parseArray(input)).toBe(input);
  expect(parseArray(new Set([1, 2]))).toEqual([1, 2]);
  expect(parseArray(new Map([["a", 1]]))).toEqual([["a", 1]]);

  expect(
    parseArray(
      (function* () {
        yield 1;
      })(),
    ),
  ).toEqual([1]);

  expect(parseArray({ length: 2, 0: "a" })).toEqual(["a", undefined]);
  expect(parseArray({ length: 0 })).toEqual([]);
  expect(parseArray({ length: -1 })).toBeUndefined();
  expect(parseArray({ length: 1.5 })).toBeUndefined();
});

test("infers known types and is the parse entry's array", () => {
  expect(parse.array).toBe(parseArray);
  expectTypeOf(parseArray(["a"] as const)).toEqualTypeOf<readonly ["a"]>();
  expectTypeOf(parseArray(null)).toEqualTypeOf<undefined>();
  expectTypeOf(parseArray(new Set<number>())).toEqualTypeOf<number[]>();

  expectTypeOf(parseArray("a" as unknown)).toEqualTypeOf<
    unknown[] | undefined
  >();
});
