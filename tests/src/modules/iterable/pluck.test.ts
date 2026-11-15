import { describe, expect, expectTypeOf, test } from "vitest";

import { pluck } from "@auaust/toolkit/iterable";
import type { Maybe } from "@auaust/toolkit/types";

describe("pluck", () => {
  test("reads the named member of each value, calling methods", () => {
    const items = [
      { id: 1, label: () => "a" },
      { id: 2, label: () => "b" },
    ];

    const ids = pluck(items, "id");

    expect([...ids]).toEqual([1, 2]);
    expectTypeOf(ids).toEqualTypeOf<IteratorObject<number, undefined>>();

    const labels = pluck(items, "label");

    expect([...labels]).toEqual(["a", "b"]);
    expectTypeOf(labels).toEqualTypeOf<IteratorObject<string, undefined>>();
    expect([...pluck(["a", "bc"], "length")]).toEqual([1, 2]);
  });

  test("accepts only a property name every union member has", () => {
    const union: ({ id: number } | { id: string; active: boolean })[] = [];

    expectTypeOf(pluck(union, "id")).toEqualTypeOf<
      IteratorObject<number | string, undefined>
    >();

    // @ts-expect-error `active` is missing from one member of the union
    pluck(union, "active");
  });

  test("runs nothing before iteration and closes its source on break", () => {
    let pulled = false;
    let closed = false;

    function* source() {
      try {
        pulled = true;

        yield { id: 1 };

        yield { id: 2 };
      } finally {
        closed = true;
      }
    }

    const result = pluck(source(), "id");

    expect(pulled).toBe(false);

    const [first] = result;

    expect(first).toBe(1);
    expect(closed).toBe(true);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    expect(() => pluck([{}], true as never)).toThrow(TypeError);
    expect(() => pluck(42 as never, "id" as never)).toThrow(TypeError);
    expect(pluck(null, "id" as never)).toBeUndefined();

    expectTypeOf(
      pluck([{ id: 1 }] as Maybe<{ id: number }[]>, "id"),
    ).toEqualTypeOf<IteratorObject<number, undefined> | undefined>();
  });
});
