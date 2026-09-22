import { transformKeys } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("transformKeys()", () => {
  test("renames keys on the original object", () => {
    const target = {
      a: 1,
      b: "two",
    };

    const result = transformKeys(target, {
      a: "alpha",
    });

    expect(result).toBe(target);

    expect(target).toEqual({
      alpha: 1,
      b: "two",
    });

    expectTypeOf(result).toEqualTypeOf<{ alpha: number; b: string }>();
  });

  test("uses a value snapshot when keys overlap", () => {
    const target = { a: 1, b: 2 };

    transformKeys(target, { a: "b", b: "a" });

    expect(target).toEqual({
      a: 2,
      b: 1,
    });
  });

  test("normalizes numeric keys when tracking overwritten values", () => {
    const target = { 0: "zero", value: "value" };

    transformKeys(target, { 0: "value", value: 0 });

    expect(target).toEqual({ 0: "value", value: "zero" });
  });

  test("preserves an earlier mapped value when its source key is ignored", () => {
    const target = { a: 1, b: 2 };

    transformKeys(target, { a: "b", b: false });

    expect(target).toEqual({ b: 1 });
  });

  test("preserves accessors while snapshotting overwritten values", () => {
    const writes: number[] = [];
    const target = { a: 1 } as { a: number; b: number };

    Object.defineProperty(target, "b", {
      enumerable: true,
      configurable: true,
      get: () => 2,
      set: (value: number) => writes.push(value),
    });

    transformKeys(target, {
      a: "b",
      b: "a",
    });

    expect(target.a).toBe(2);
    expect(target.b).toBe(2);
    expect(writes).toEqual([1]);
    expect(Object.getOwnPropertyDescriptor(target, "b")?.get).toBeTypeOf(
      "function",
    );
  });
});
