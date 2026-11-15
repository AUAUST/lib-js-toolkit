import { describe, expect, expectTypeOf, test } from "vitest";

import { some } from "@auaust/toolkit/iterable";

describe("some", () => {
  test("short-circuits on a lazy source and closes it", () => {
    let closed = false;
    let read = 0;

    function* source() {
      try {
        yield 1;

        read++;

        yield 2;
      } finally {
        closed = true;
      }
    }

    expect(some(source(), (value) => value === 1)).toBe(true);
    expect(read).toBe(0);
    expect(closed).toBe(true);
  });

  test("gives false when no value or an empty source", () => {
    expect(some([1, 2], (value) => value > 5)).toBe(false);
    expect(some([], Boolean)).toBe(false);
  });

  test("accepts a property name", () => {
    expect(some([{ on: false }, { on: true }], "on")).toBe(true);
    expect(some([{ on: () => 0 }], "on")).toBe(false);
  });

  test("throws on invalid arguments and passes nullish through", () => {
    expect(() => some([1], true as never)).toThrow(TypeError);
    expect(() => some(42 as never, Boolean)).toThrow(TypeError);
    expect(some(undefined, Boolean)).toBeUndefined();
    expectTypeOf(some([1], Boolean)).toEqualTypeOf<boolean>();

    expectTypeOf(some([1] as number[] | null, Boolean)).toEqualTypeOf<
      boolean | undefined
    >();
  });
});
