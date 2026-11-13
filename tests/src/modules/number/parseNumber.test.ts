import { expect, expectTypeOf, test } from "vitest";

import { parseNumber } from "@auaust/toolkit/number";

import { createFunctions, nullishValues } from "#tests/fixtures/values";

test("parses every conversion table category", () => {
  const cases = [
    ...nullishValues.map((input) => [input, undefined] as const),
    ...createFunctions().map((input) => [input, undefined] as const),
    [" 12 ", 12],
    ["", undefined],
    [" \t ", undefined],
    ["a", undefined],
    ["1_000", 1000],
    ["0x1F", 31],
    ["Infinity", Infinity],
    ["12px", undefined],
    ["1__0", undefined],
    ["_1", undefined],
    ["1_", undefined],
    ["1_.0", undefined],
    [0, 0],
    [-0, -0],
    [NaN, undefined],
    [Infinity, Infinity],
    [-Infinity, -Infinity],
    [10n, 10],
    [BigInt(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER],
    [-BigInt(Number.MAX_SAFE_INTEGER), -Number.MAX_SAFE_INTEGER],
    [BigInt(Number.MAX_SAFE_INTEGER) + 1n, undefined],
    [-BigInt(Number.MAX_SAFE_INTEGER) - 1n, undefined],
    [2n ** 60n, undefined],
    [true, undefined],
    [false, undefined],
    [Symbol(), undefined],
    [[], undefined],
    [[5], undefined],
    [new Set([5]), undefined],
    [new Map([[1, 5]]), undefined],
    [
      (function* () {
        yield 5;
      })(),
      undefined,
    ],
    [{ length: 1, 0: 5 }, undefined],
    [{}, undefined],
    [new Date(123), 123],
    [new Date(NaN), undefined],
    [{ valueOf: () => 3 }, 3],
  ] as const;

  for (const [input, expected] of cases) {
    expect(parseNumber(input)).toBe(expected);
  }

  expectTypeOf(parseNumber(1)).toEqualTypeOf<number | undefined>();
});
