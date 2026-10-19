import { record } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("record() preserves entry types, symbols, and the last duplicate value", () => {
  const key = Symbol("key");
  const result = record([
    ["value", 1],
    [key, false],
    ["value", "last"],
  ]);

  expectTypeOf(result.value).toEqualTypeOf<"last">();
  expectTypeOf(result[key]).toEqualTypeOf<false>();

  expect(record).toBe(Object.fromEntries);
  expect(result.value).toBe("last");
  expect(result[key]).toBe(false);
});

test("record() accepts general iterables and empty entries", () => {
  const result = record(new Map<string, number>([["one", 1]]));

  expectTypeOf(result).toEqualTypeOf<Record<string, number>>();
  expectTypeOf(record(new Map<"a" | "b", number>()))
    .toEqualTypeOf<Record<"a" | "b", number>>();
  expectTypeOf(record([])).toEqualTypeOf<{}>();

  expect(result.one).toBe(1);
  expect(record([])).toEqual({});
});

test("record() supports loose entry arrays and normalized numeric keys", () => {
  const loose = [["one", 1]];
  const result = record([[1, "first"], ["1", "last"]]);

  expectTypeOf(record(loose)).toBeAny();
  expectTypeOf(record(loose as any)).toBeAny();
  expectTypeOf(result[1]).toEqualTypeOf<"last">();

  expect(record(loose)).toEqual({
    one: 1,
  });
  expect(result[1]).toBe("last");
});
