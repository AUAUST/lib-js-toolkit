import { describe, expect, expectTypeOf, test } from "vitest";

import { pluck } from "@auaust/toolkit/array";
import type { Maybe } from "@auaust/toolkit/types";

describe("pluck", () => {
  test("reads the named member of each item into a new array", () => {
    const items = [
      { id: 1, label: () => "a" },
      { id: 2, label: () => "b" },
    ];

    const ids = pluck(items, "id");

    expect(ids).toEqual([1, 2]);
    expectTypeOf(ids).toEqualTypeOf<number[]>();
    expect(pluck(items, "label")).toEqual(["a", "b"]);
  });

  test("keeps tuple lengths and accepts readonly arrays", () => {
    const result = pluck([{ id: 1 }, { id: 2 }] as const, "id");

    expect(result).toEqual([1, 2]);
    expectTypeOf(result).toEqualTypeOf<[1 | 2, 1 | 2]>();
  });

  test("accepts only a property name every union member has", () => {
    const union: ({ id: number } | { id: number; active: boolean })[] = [];

    // @ts-expect-error `active` is missing from one member of the union
    pluck(union, "active");
  });

  test("passes nullish through and rejects invalid properties", () => {
    expect(pluck(null, "id" as never)).toBeUndefined();
    expect(() => pluck([{}], true as never)).toThrow(TypeError);

    expectTypeOf(
      pluck([{ id: 1 }] as Maybe<{ id: number }[]>, "id"),
    ).toEqualTypeOf<number[] | undefined>();
  });

  test("copies any iterable but a string", () => {
    const result = pluck(new Set([{ id: 1 }, { id: 2 }]), "id");

    expect(result).toEqual([1, 2]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
    expect(() => pluck({} as never, "id")).toThrow(TypeError);
  });
});
