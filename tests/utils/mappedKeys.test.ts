import { describe, expect, expectTypeOf, test } from "vitest";

import {
  isArray,
  mappedKeys,
  type FunctionMappedKey,
  type MappedSource,
  type RecordMappedKey,
} from "@auaust/toolkit";

import { createKeyMapper } from "../fixtures/objects";

describe("mappedKeys", () => {
  test("returns a copy with unchanged values", () => {
    const source = {
      a: 1,
      b: "two",
    };

    const result = mappedKeys(source, {
      a: "alpha",
    });

    expect(result).toEqual({
      alpha: 1,
      b: "two",
    });

    expect(result).not.toBe(source);
    expectTypeOf(result).toEqualTypeOf<{ alpha: number; b: string }>();
  });

  test("maps, retains, and excludes keys with a function", () => {
    const result = mappedKeys(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      (key) => {
        if (key === "a") {
          return "alpha";
        }

        return key === "b";
      },
    );

    expect(result).toEqual({
      alpha: 1,
      b: 2,
    });
  });

  test("uses Object.keys semantics for arrays", () => {
    const result = mappedKeys([10, 20], (key, value) => {
      expectTypeOf(key).toEqualTypeOf<`${number}`>();
      expectTypeOf(value).toEqualTypeOf<number>();

      return `item-${String(key)}`;
    });

    expect(result).toEqual({
      "item-0": 10,
      "item-1": 20,
    });

    expect(isArray(result)).toBe(false);
  });

  test("copies tuple indices into records and supports numeric mapping keys", () => {
    const source = [10, "twenty"] as const;
    const copied = mappedKeys(source);

    const result = mappedKeys(source, {
      0: "first",
      1: false,
    });

    expectTypeOf(copied).toEqualTypeOf<{
      readonly 0: 10;
      readonly 1: "twenty";
    }>();

    expectTypeOf(copied).toEqualTypeOf<MappedSource<typeof source>>();

    expectTypeOf<
      RecordMappedKey<"0", { 0: "first" }>
    >().toEqualTypeOf<"first">();

    expectTypeOf(result).toEqualTypeOf<{
      readonly first: 10;
    }>();

    expect(result).toEqual({
      first: 10,
    });

    expect(isArray(copied)).toBe(false);
  });

  test("copies symbols only when no mapper is supplied", () => {
    const marker = Symbol("marker");

    const source = {
      entry: 4,
      [marker]: "symbol value",
    };

    const copied = mappedKeys(source);

    const result = mappedKeys(source, (key, value) => {
      expectTypeOf(key).toEqualTypeOf<"entry">();
      expectTypeOf(value).toEqualTypeOf<number>();

      return true;
    });

    expectTypeOf(copied).toEqualTypeOf<typeof source>();
    expectTypeOf(result).toEqualTypeOf<Record<"entry", number>>();
    expect(copied[marker]).toBe("symbol value");
    expect(Reflect.ownKeys(result)).toEqual(["entry"]);
  });

  test("normalizes numeric source and destination names", () => {
    const result = mappedKeys(
      {
        0: "zero",
      },
      {
        0: 1,
      },
    );

    expectTypeOf(result).toEqualTypeOf<{
      1: string;
    }>();

    expect(result).toEqual({
      1: "zero",
    });
  });

  test("accepts callable key mappers and preserves literal keys", () => {
    const mapper = createKeyMapper();

    const result = mappedKeys(
      {
        entry: 4,
      },
      mapper,
    );

    expectTypeOf(result).toEqualTypeOf<Record<"renamed", number>>();

    expectTypeOf<
      FunctionMappedKey<{ entry: number }, typeof mapper>
    >().toEqualTypeOf<"renamed">();

    expect(result).toEqual({
      renamed: 4,
    });
  });
});
