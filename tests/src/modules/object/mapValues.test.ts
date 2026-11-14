import { describe, expect, expectTypeOf, test } from "vitest";

import { isArray } from "@auaust/toolkit";
import { mapValues } from "@auaust/toolkit/object";

import { createPair, createValueTransformer } from "#tests/fixtures/objects";

describe("mapValues", () => {
  test("returns a copy with transformed values", () => {
    const source = createPair();
    const calls: unknown[][] = [];

    const result = mapValues(source, (value, key, sourceKey) => {
      calls.push([value, key, sourceKey]);

      return `${key}:${value}`;
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
    const result = mapValues([1, 2, 3], (value, key, sourceKey) => {
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

    if (!false) {
      return;
    }

    // @ts-expect-error Mapping an array produces a record without array methods.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    result.map;

    // @ts-expect-error Array metadata is not copied.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    result.length;
  });

  test("projects readonly tuples into records and preserves optional indices", () => {
    const source: readonly [number, string?] = [1];

    const result = mapValues(source, (value, key) => {
      expectTypeOf(value).toEqualTypeOf<number | string | undefined>();
      expectTypeOf(key).toEqualTypeOf<`${number}`>();

      return String(value);
    });

    expectTypeOf(result).toEqualTypeOf<{
      readonly 0: string;
      readonly 1?: string;
    }>();

    expect(result).toEqual({
      0: "1",
    });
  });

  test("includes string, numeric and symbol keys in object types", () => {
    const marker = Symbol("marker");

    const source = {
      entry: 4,
      1: true,
      [marker]: "symbol value",
    };

    const calls: unknown[][] = [];
    const copied = mapValues(source);

    const result = mapValues(source, (value, key, sourceKey) => {
      expectTypeOf(value).toEqualTypeOf<number | boolean | string>();
      expectTypeOf(key).toEqualTypeOf<"entry" | 1 | typeof marker>();
      expectTypeOf(sourceKey).toEqualTypeOf<"entry" | 1 | typeof marker>();
      calls.push([value, key, sourceKey]);

      return String(value);
    });

    expectTypeOf(copied).toEqualTypeOf<typeof source>();

    expectTypeOf(result).toEqualTypeOf<{
      entry: string;
      1: string;
      [marker]: string;
    }>();

    expect(result[1]).toBe("true");
    expect(result["1"]).toBe("true");

    expect(calls).toEqual([
      [true, "1", "1"],
      [4, "entry", "entry"],
      ["symbol value", marker, marker],
    ]);

    const symbolsOnly = { [marker]: 2 };

    expect(mapValues(symbolsOnly)).toEqual(symbolsOnly);
    expect(mapValues(symbolsOnly, (value) => value * 2)[marker]).toBe(4);
  });

  test("visits every own object key and copies fresh writable properties", () => {
    const marker = Symbol("marker");
    const hiddenMarker = Symbol("hidden");
    const inheritedMarker = Symbol("inherited");
    const nested = {};

    const source = {
      visible: nested,
      hidden: 3,
      [marker]: 4,
      [hiddenMarker]: 5,
    };

    Object.setPrototypeOf(source, { inherited: 1, [inheritedMarker]: 2 });

    Object.defineProperties(source, {
      visible: {
        writable: false,
        configurable: false,
      },
      hidden: {
        enumerable: false,
        writable: false,
        configurable: false,
      },
      [marker]: {
        writable: false,
        configurable: false,
      },
      [hiddenMarker]: {
        enumerable: false,
        writable: false,
        configurable: false,
      },
    });

    const descriptors = Object.getOwnPropertyDescriptors(source);
    const calls: PropertyKey[] = [];

    const result = mapValues(source, (value, key, sourceKey) => {
      expect(key).toBe(sourceKey);
      expect(value).toBe(source[key]);
      calls.push(key);

      return value;
    });

    const copied = mapValues(source);

    expect(calls).toEqual(Reflect.ownKeys(source));

    for (const output of [result, copied]) {
      expect(Object.getPrototypeOf(output)).toBeNull();
      expect(Reflect.ownKeys(output)).toEqual(Reflect.ownKeys(source));
      expect(output.visible).toBe(nested);

      for (const key of Reflect.ownKeys(output)) {
        expect(Object.getOwnPropertyDescriptor(output, key)).toEqual({
          value: Reflect.get(source, key),
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
    }

    expect(Object.getOwnPropertyDescriptors(source)).toEqual(descriptors);
  });

  test("keeps generic records indexable and preserves transformer write-back", () => {
    interface Box {
      n: number;
    }

    function generic<Source extends Record<string, Box>>(
      source: Source,
      key: keyof Source,
    ) {
      const result = mapValues(source, (box) => {
        return { doubled: box.n * 2 };
      });

      const entry = result[key];

      expectTypeOf(entry.doubled).toEqualTypeOf<number>();

      const again = mapValues(result, (value) => value.doubled);

      function copyValues(
        value: Source[keyof Source],
        key: keyof Source,
        sourceKey: keyof Source,
      ) {
        output[key] = value;
        output[sourceKey] = value;

        return value;
      }

      const output: { [Key in keyof Source]: Source[Key] } = { ...source };

      mapValues(source, copyValues);

      return again[key];
    }

    function symbols<Source extends Record<PropertyKey, Box>>(source: Source) {
      const output: { [Key in keyof Source]: Source[Key] } = { ...source };

      mapValues(source, (box, key, sourceKey) => {
        output[key] = box;
        output[sourceKey] = box;

        return box;
      });

      return output;
    }

    const marker = Symbol("marker");

    expect(
      generic(
        {
          entry: { n: 2 },
        },
        "entry",
      ),
    ).toBe(4);

    expect(
      symbols({
        [marker]: { n: 2 },
      })[marker].n,
    ).toBe(2);
  });

  test("makes transformed readonly objects writable and keeps optional properties", () => {
    const source: {
      readonly required: number;
      readonly optional?: number;
    } = { required: 1 };

    const result = mapValues(source, (value) => String(value));

    expectTypeOf(result).toEqualTypeOf<{
      required: string;
      optional?: string;
    }>();

    result.required = "changed";

    expect(source.required).toBe(1);
    expect(result.optional).toBeUndefined();
  });

  test("types primitive inputs as their copied records", () => {
    const characters = mapValues("ab");
    const empty = mapValues(42);

    expect(mapValues(null)).toEqual({});
    expect(mapValues(undefined)).toEqual({});
    expect(mapValues(false)).toEqual({});
    expect(mapValues(Symbol("primitive"))).toEqual({});

    expect(mapValues("ab", (value) => value.toUpperCase())).toEqual({
      0: "A",
      1: "B",
    });

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

    const result = mapValues(
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
