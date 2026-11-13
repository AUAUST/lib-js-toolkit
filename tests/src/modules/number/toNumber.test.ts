import { expect, expectTypeOf, test } from "vitest";

import { n, toNumber } from "@auaust/toolkit/number";

import { createValues } from "#tests/fixtures/values";

test.for(createValues())("matches native conversion on case %#", (input) => {
  if (typeof input === "symbol") {
    expect(() => toNumber(input)).toThrow(TypeError);
  } else {
    expect(toNumber(input)).toBe(Number(input));
  }
});

test("covers conversion table forms", () => {
  const cases = [
    ["", 0],
    [" 12 ", 12],
    ["a", NaN],
    [null, 0],
    [undefined, NaN],
    [10n, 10],
    [[5], 5],
    [{}, NaN],
    [{ length: 1, 0: 5 }, NaN],
    [new Set([5]), NaN],
    [new Map([[1, 5]]), NaN],
    [
      (function* () {
        yield 5;
      })(),
      NaN,
    ],
  ] as const;

  for (const [input, expected] of cases) {
    expect(toNumber(input)).toBe(expected);
  }

  expect(n).toBe(toNumber);
  expectTypeOf(toNumber(12)).toEqualTypeOf<12>();
  expectTypeOf(toNumber<number>(12)).toEqualTypeOf<number>();
  expectTypeOf(toNumber<1 | 2>(1)).toEqualTypeOf<1 | 2>();
  expectTypeOf(toNumber("12")).toEqualTypeOf<number>();
});
