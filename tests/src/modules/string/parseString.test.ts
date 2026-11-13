import { expect, expectTypeOf, test } from "vitest";

import { parseString } from "@auaust/toolkit/string";

import { createFunctions, nullishValues } from "#tests/fixtures/values";

test("interprets each conversion-table input", () => {
  for (const input of [
    ...nullishValues,
    NaN,
    ...createFunctions(),
    {},
    new Map(),
    new Set(),
    { length: 1 },
    (function* () {
      yield 1;
    })(),
  ]) {
    expect(parseString(input)).toBeUndefined();
  }

  for (const input of ["", "a", 0, 1, -Infinity, Infinity, 1n, true, false]) {
    expect(parseString(input)).toBe(String(input));
  }

  expect(parseString(Symbol("description"))).toBe("description");
  expect(parseString(Symbol())).toBeUndefined();
  expect(parseString({ toString: () => "custom" })).toBe("custom");
  expect(parseString(new Date(0))).toBe(String(new Date(0)));
  expectTypeOf(parseString("a")).toEqualTypeOf<string | undefined>();
});

test("skips missing interpretations and cycles", () => {
  expect(parseString([1, null, "a"])).toBe("1, a");
  expect(parseString([])).toBeUndefined();
  expect(parseString([null])).toBeUndefined();

  const cyclic: unknown[] = [1];

  cyclic.push(cyclic);

  expect(parseString(cyclic)).toBe("1");
});
