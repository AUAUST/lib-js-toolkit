import { isArray } from "@auaust/toolkit/isArray";
import { callable } from "@auaust/toolkit/protocols/callable";
import { mappedKeys } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("mappedKeys()", () => {
  test("returns a copy with unchanged values", () => {
    const source = { a: 1, b: "two" };

    const result = mappedKeys(source, { a: "alpha" });

    expect(result).toEqual({ alpha: 1, b: "two" });
    expect(result).not.toBe(source);
    expectTypeOf(result).toEqualTypeOf<{ alpha: number; b: string }>();
  });

  test("maps, retains, and excludes keys with a function", () => {
    const result = mappedKeys({ a: 1, b: 2, c: 3 }, (key) => {
      if (key === "a") {
        return "alpha";
      }

      if (key === "b") {
        return true;
      }

      return false;
    });

    expect(result).toEqual({ alpha: 1, b: 2 });
  });

  test("uses Object.keys semantics for arrays", () => {
    const result = mappedKeys([10, 20], (key) => `item-${String(key)}`);

    expect(result).toEqual({
      "item-0": 10,
      "item-1": 20,
    });

    expect(isArray(result)).toBe(false);
  });

  test("accepts callable key mappers and preserves literal keys", () => {
    const mapper = {
      key: "renamed" as const,
      [callable](_key: "entry", _value: number) {
        return this.key;
      },
    };
    const result = mappedKeys({
      entry: 4,
    }, mapper);

    expectTypeOf(result).toEqualTypeOf<Record<"renamed", number>>();
    expect(result).toEqual({
      renamed: 4,
    });
  });
});
