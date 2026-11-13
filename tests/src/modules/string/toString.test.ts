import { expect, expectTypeOf, test } from "vitest";

import { s, toString } from "@auaust/toolkit/string";

import {
  createFunctions,
  createObjects,
  primitiveValues,
} from "#tests/fixtures/values";

test("converts each conversion-table input", () => {
  for (const input of [
    ...primitiveValues,
    ...createObjects(),
    ...createFunctions(),
    { length: 1 },
    (function* () {
      yield 1;
    })(),
  ]) {
    expect(toString(input)).toBe(input == null ? "" : String(input));
  }
});

test("joins nested, sparse and cyclic arrays", () => {
  expect(toString([1, [2, [3]]])).toBe("1,2,3");

  const sparse = [1];

  sparse.length = 3;
  sparse[2] = 3;

  expect(toString(sparse)).toBe("1,,3");

  const cyclic: unknown[] = [1];

  cyclic.push(cyclic);

  expect(toString(cyclic)).toBe("1,");
});

test("uses native object conversion and errors", () => {
  expect(
    toString({
      [Symbol.toPrimitive](hint: string) {
        expect(hint).toBe("string");

        return "custom";
      },
    }),
  ).toBe("custom");

  expect(() => toString(Object.create(null))).toThrow(TypeError);
});

test("preserves literals and alias identity", () => {
  expect(s).toBe(toString);
  expectTypeOf(toString("a")).toEqualTypeOf<"a">();
  expectTypeOf(toString(1)).toEqualTypeOf<string>();
});
