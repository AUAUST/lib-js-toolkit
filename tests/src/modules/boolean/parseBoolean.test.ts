import { expect, expectTypeOf, test } from "vitest";

import { parseBoolean } from "@auaust/toolkit/boolean";
import { emptiable } from "@auaust/toolkit/protocol";

test.for([
  [null, false],
  [undefined, false],
  [false, false],
  [true, true],
  ["FALSE", false],
  [" false ", false],
  ["", false],
  ["  ", false],
  ["0", true],
  ["no", true],
  ["true", true],
  [0, false],
  [-0, false],
  [NaN, false],
  [0n, false],
  [1, true],
  [1n, true],
  [Symbol("value"), true],
  [() => {}, true],
  [[], false],
  [{}, false],
  [new Map(), false],
  [[0], true],
  [{ a: 1 }, true],
] as const)("parses case %#", ([input, expected]) => {
  expect(parseBoolean(input)).toBe(expected);
});

test("follows the emptiable protocol", () => {
  expect(parseBoolean({ a: 1, [emptiable]: () => true })).toBe(false);
  expect(parseBoolean({ [emptiable]: () => false })).toBe(true);
});

test("never consumes a generator", () => {
  const generator = (function* () {
    yield 1;
  })();

  expect(parseBoolean(generator)).toBe(true);
  expect(generator.next().value).toBe(1);
  expectTypeOf(parseBoolean("x")).toEqualTypeOf<boolean>();
});
