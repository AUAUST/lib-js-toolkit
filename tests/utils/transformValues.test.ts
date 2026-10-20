import { callable } from "@auaust/toolkit/protocols/callable";
import { transformValues } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";
import { createPair, createValueTransformer } from "../fixtures/objects";

describe("transformValues", () => {
  test("transforms values on the original object", () => {
    const target = createPair();
    const calls: unknown[][] = [];

    const result = transformValues(target, (value, key, sourceKey) => {
      calls.push([value, key, sourceKey]);
      return `${String(key)}:${value}`;
    });

    expect(result).toBe(target);
    expect(target).toEqual({
      a: "a:1",
      b: "b:2",
    });
    expect(calls).toEqual([
      [1, "a", "a"],
      [2, "b", "b"],
    ]);
    expectTypeOf(result).toEqualTypeOf<{ a: string; b: string }>();
  });

  test("supports objects with a null prototype", () => {
    const target = Object.assign(Object.create(null), {
      value: 2,
    }) as {
      value: number;
    };

    transformValues(target, (value) => value * 3);

    expect(target.value).toBe(6);
    expect(target).toEqual({
      value: 6,
    });
  });

  test("accepts callable value transformers and preserves result types", () => {
    const transformer = createValueTransformer();

    const result = transformValues(
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
