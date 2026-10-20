import { isArray } from "@auaust/toolkit/isArray";
import { callable } from "@auaust/toolkit/protocols/callable";
import { mappedValues } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";
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
    const result = mappedValues([1, 2, 3], (value) => {
      return Number(value) * 2;
    });

    expect(result).toEqual({
      0: 2,
      1: 4,
      2: 6,
    });
    expect(isArray(result)).toBe(false);
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
