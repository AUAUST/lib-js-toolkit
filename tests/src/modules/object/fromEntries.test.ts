import { describe, expect, expectTypeOf, test } from "vitest";

import {
  fromEntries,
  plain,
  record,
  toNullPrototype,
} from "@auaust/toolkit/object";

describe("fromEntries", () => {
  test("preserves entry types, symbols, and the last duplicate value", () => {
    const key = Symbol("key");

    const result = fromEntries([
      ["value", 1],
      [key, false],
      ["value", "last"],
    ]);

    expectTypeOf(result.value).toEqualTypeOf<"last">();
    expectTypeOf(result[key]).toEqualTypeOf<false>();
    expect(fromEntries).toBe(Object.fromEntries);
    expect(record).toBe(fromEntries);
    expect(result.value).toBe("last");
    expect(result[key]).toBe(false);
  });

  test("accepts general iterables and empty entries", () => {
    const result = fromEntries(new Map<string, number>([["one", 1]]));

    expectTypeOf(result).toEqualTypeOf<Record<string, number>>();

    expectTypeOf(fromEntries(new Map<"a" | "b", number>())).toEqualTypeOf<
      Record<"a" | "b", number>
    >();

    expectTypeOf(fromEntries([])).toEqualTypeOf<{}>();
    expect(result.one).toBe(1);
    expect(fromEntries([])).toEqual({});
  });

  test("supports loose entry arrays and normalized numeric keys", () => {
    const loose = [["one", 1]];

    const result = fromEntries([
      [1, "first"],
      ["1", "last"],
    ]);

    expectTypeOf(fromEntries(loose)).toBeAny();
    expectTypeOf(fromEntries(loose as any)).toBeAny();
    expectTypeOf(result[1]).toEqualTypeOf<"last">();

    expect(fromEntries(loose)).toEqual({
      one: 1,
    });

    expect(result[1]).toBe("last");
  });
});

describe("aliases", () => {
  test("record keeps literal keys of readonly tuple entries", () => {
    const entries = [
      ["a", 1],
      ["b", 2],
    ] as const;

    expectTypeOf(record(entries)).toEqualTypeOf<{ a: 1; b: 2 }>();
  });

  test("plain is toNullPrototype", () => {
    expect(plain).toBe(toNullPrototype);
  });
});
