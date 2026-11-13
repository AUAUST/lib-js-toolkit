import { expect, test } from "vitest";

import * as guard from "@auaust/toolkit/guard";
import * as iterable from "@auaust/toolkit/iterable";

function* generate() {
  yield 1;
}

test("accepts iterables, strings included, and shares its guard export", () => {
  expect(guard.isIterable).toBe(iterable.isIterable);

  for (const candidate of [
    [1],
    "a",
    new Map(),
    new Set(),
    generate(),
    new Uint8Array(1),
  ]) {
    expect(iterable.isIterable(candidate)).toBe(true);
  }
});

test("rejects non-iterables", () => {
  for (const candidate of [
    { length: 1 },
    {},
    1,
    null,
    undefined,
    { [Symbol.iterator]: 1 },
  ]) {
    expect(iterable.isIterable(candidate)).toBe(false);
  }
});
