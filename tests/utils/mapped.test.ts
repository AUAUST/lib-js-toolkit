import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { mapped } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

import { mappingCases } from "../fixtures/mapping";
import {
  createKeyMapper,
  createTriple,
  createValueTransformer,
} from "../fixtures/objects";
import { primitiveValues } from "../fixtures/values";

describe("mapped", () => {
  test.for(primitiveValues)("preserves non-object input %s", (input) => {
    // @ts-expect-error Non-object inputs are tolerated at runtime.
    expect(mapped(input)).toBe(input);
  });

  test.each(mappingCases)(
    "mapped handles %s",
    (_name, map, transformer, expected) => {
      const source = createTriple();
      const result = mapped(source, map, transformer);

      expect(result).not.toBe(source);
      expect(result).toEqual(Object.fromEntries(expected));
      expect(source).toEqual(createTriple());
    },
  );

  test("copies shallowly and types explicit names and exclusions", () => {
    const nested = {};

    const source = {
      a: 1,
      b: 2,
      nested,
    };

    const result = mapped(source, {
      a: "alpha",
      b: false,
    });

    expect(mapped(source).nested).toBe(nested);
    expect(result.nested).toBe(nested);
    expect(result.alpha).toBe(1);
    expectTypeOf(result).toEqualTypeOf<{ alpha: number; nested: {} }>();

    if (false) {
      // @ts-expect-error Renamed keys are removed from the result type.
      result.a;
      // @ts-expect-error Excluded keys are removed from the result type.
      result.b;
    }
  });

  test("copies arrays and tuples into records without array metadata", () => {
    const copied = mapped([1, 2]);

    const result = mapped(
      [1, 2] as const,
      {
        0: "first",
        1: false,
      },
      (value, key, sourceKey) => {
        expectTypeOf(value).toEqualTypeOf<1 | 2>();
        expectTypeOf(key).toEqualTypeOf<"first">();
        expectTypeOf(sourceKey).toEqualTypeOf<`${number}`>();

        return String(value);
      },
    );

    expectTypeOf(copied).toEqualTypeOf<Record<`${number}`, number>>();
    expectTypeOf(result).toEqualTypeOf<{
      readonly first: string;
    }>();
    expect(Array.isArray(copied)).toBe(false);
    expect(result).toEqual({
      first: "1",
    });
  });

  test("omits source symbols when mapping while allowing symbol destinations", () => {
    const sourceSymbol = Symbol("source");
    const destinationSymbol = Symbol("destination");

    const source = {
      entry: 4,
      [sourceSymbol]: "symbol value",
    };

    const copied = mapped(source);

    const result = mapped(
      source,
      {
        entry: destinationSymbol,
      },
      (value, key, sourceKey) => {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(key).toEqualTypeOf<typeof destinationSymbol>();
        expectTypeOf(sourceKey).toEqualTypeOf<"entry">();

        return String(value);
      },
    );

    expectTypeOf(copied).toEqualTypeOf<typeof source>();
    expectTypeOf(result).toEqualTypeOf<{
      [destinationSymbol]: string;
    }>();
    expect(copied[sourceSymbol]).toBe("symbol value");
    expect(Reflect.ownKeys(result)).toEqual([destinationSymbol]);
    expect(result[destinationSymbol]).toBe("4");
  });

  test("passes values to mappers and original and mapped keys to transformers", () => {
    const mapper = vi.fn((key: string, _value: number) => {
      return key === "a" ? "renamed" : true;
    });

    const transformer = vi.fn(
      (value: number, key: PropertyKey, _sourceKey: string) => {
        return String(key) + ":" + value;
      },
    );

    const result = mapped(createTriple(), mapper, transformer);

    expect(mapper.mock.calls).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    expect(transformer.mock.calls).toEqual([
      [1, "renamed", "a"],
      [2, "b", "b"],
      [3, "c", "c"],
    ]);
    expect(result).toEqual({
      renamed: "renamed:1",
      b: "b:2",
      c: "c:3",
    });
  });

  test("accepts callable key mappers and preserves literal keys", () => {
    const mapper = createKeyMapper();

    const result = mapped(
      {
        entry: 4,
      },
      mapper,
    );

    expectTypeOf(result).toEqualTypeOf<Record<"renamed", number>>();
    expect(result).toEqual({
      renamed: 4,
    });
  });

  test("accepts callable value transformers and preserves result types", () => {
    const transformer = createValueTransformer();

    const result = mapped(
      {
        entry: 4,
      },
      undefined,
      transformer,
    );

    expectTypeOf(result).toEqualTypeOf<{
      entry: string;
    }>();
    expect(result).toEqual({
      entry: "8:entry:entry",
    });
  });

  test("combines callable key and value transformations", () => {
    const result = mapped(
      {
        entry: 4,
      },
      {
        [callable](key: "entry", _value: number) {
          return "renamed" as const;
        },
      },
      {
        [callable](value, key, sourceKey) {
          expectTypeOf(value).toEqualTypeOf<number>();
          expectTypeOf(key).toEqualTypeOf<"renamed">();
          expectTypeOf(sourceKey).toEqualTypeOf<"entry">();

          return `${value}:${key}:${sourceKey}`;
        },
      },
    );

    expectTypeOf(result).toEqualTypeOf<Record<"renamed", string>>();
    expect(result.renamed).toBe("4:renamed:entry");
  });
});
