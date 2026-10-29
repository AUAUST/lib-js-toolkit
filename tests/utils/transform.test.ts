import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { transform } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocol";

import { mappingCases } from "../fixtures/mapping";
import {
  createKeyMapper,
  createTriple,
  createValueTransformer,
} from "../fixtures/objects";
import { primitiveValues } from "../fixtures/values";

describe("transform", () => {
  test.for(primitiveValues)("preserves non-object input %s", (input) => {
    // @ts-expect-error Non-object inputs are tolerated at runtime.
    expect(transform(input)).toBe(input);
  });

  test.each(mappingCases)(
    "transform handles %s",
    (_name, map, transformer, expected) => {
      const source = createTriple();
      const result = transform(source, map, transformer);

      expect(result).toBe(source);
      expect(result).toEqual(Object.fromEntries(expected));
    },
  );

  test("types explicit exclusions", () => {
    const result = transform(createTriple(), {
      a: false,
    });

    expectTypeOf(result).toEqualTypeOf<{ b: number; c: number }>();

    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    result.a;
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

    const result = transform(createTriple(), mapper, transformer);

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

    const result = transform(
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

    const result = transform(
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
    const result = transform(
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
