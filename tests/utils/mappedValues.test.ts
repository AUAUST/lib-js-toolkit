import { describe, expect, expectTypeOf, test } from "vitest";

import { mappedValues } from "@auaust/toolkit";
import { isArray } from "@auaust/toolkit/isArray";

import { createPair, createValueTransformer } from "../fixtures/objects";

describe("mappedValues", () => {
  test("returns a copy with transformed values", () => {
    const source = createPair();
    const calls: unknown[][] = [];

    const result = mappedValues(source, (value, key, sourceKey) => {
      calls.push([value, key, sourceKey]);

      return `${String(key)}:${value}`;
    });

    expect(result).toEqual({
      a: "a:1",
      b: "b:2",
    });
    expect(result).not.toBe(source);
    expect(source).toEqual({
      a: 1,
      b: 2,
    });
    expect(calls).toEqual([
      [1, "a", "a"],
      [2, "b", "b"],
    ]);
    expectTypeOf(result).toEqualTypeOf<{ a: string; b: string }>();
  });

  test("uses Object.keys semantics for arrays", () => {
    const result = mappedValues([1, 2, 3], (value, key, sourceKey) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(key).toEqualTypeOf<`${number}`>();
      expectTypeOf(sourceKey).toEqualTypeOf<`${number}`>();

      return value * 2;
    });

    expect(result).toEqual({
      0: 2,
      1: 4,
      2: 6,
    });
    expect(isArray(result)).toBe(false);
    expectTypeOf(result).toEqualTypeOf<Record<`${number}`, number>>();

    if (false) {
      // @ts-expect-error Mapping an array produces a record without array methods.
      result.map;
      // @ts-expect-error Array metadata is not copied.
      result.length;
    }
  });

  test("projects readonly tuples into records and preserves optional indices", () => {
    const source: readonly [number, string?] = [1];

    const result = mappedValues(source, (value, key) => {
      expectTypeOf(value).toEqualTypeOf<number | string | undefined>();
      expectTypeOf(key).toEqualTypeOf<`${number}`>();

      return String(value);
    });

    expectTypeOf(result).toEqualTypeOf<{
      readonly "0": string;
      readonly "1"?: string;
    }>();
    expect(result).toEqual({
      0: "1",
    });
  });

  test("omits symbol properties from results and transformer arguments", () => {
    const marker = Symbol("marker");

    const source = {
      entry: 4,
      [marker]: "symbol value",
    };

    const copied = mappedValues(source);

    const result = mappedValues(source, (value, key) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(key).toEqualTypeOf<"entry">();

      return String(value);
    });

    expectTypeOf(copied).toEqualTypeOf<{
      entry: number;
    }>();
    expectTypeOf(result).toEqualTypeOf<{
      entry: string;
    }>();
    expect(Reflect.ownKeys(copied)).toEqual(["entry"]);
    expect(Reflect.ownKeys(result)).toEqual(["entry"]);
  });

  test("types primitive inputs as their copied records", () => {
    const characters = mappedValues("ab");
    const empty = mappedValues(42);

    expectTypeOf(characters).toEqualTypeOf<Record<`${number}`, string>>();
    expectTypeOf(empty).toEqualTypeOf<{}>();
    expect(characters).toEqual({
      0: "a",
      1: "b",
    });
    expect(empty).toEqual({});
  });

  test("accepts callable value transformers and preserves result types", () => {
    const transformer = createValueTransformer();

    const result = mappedValues(
      {
        entry: 4,
      },
      transformer,
    );

    expectTypeOf(result).toEqualTypeOf<{
      entry: string;
    }>();
    expect(result).toEqual({
      entry: "8:entry:entry",
    });
  });
});
