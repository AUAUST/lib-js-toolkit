import { describe, expect, expectTypeOf, test } from "vitest";

import { isString } from "@auaust/toolkit/guard";
import { every } from "@auaust/toolkit/iterable";

describe("every", () => {
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

    expect(every(source(), (value) => value > 1)).toBe(false);
    expect(read).toBe(0);
    expect(closed).toBe(true);
  });

  test("gives true when every value is accepted or the source is empty", () => {
    expect(every([1, 2], (value, index) => value === index + 1)).toBe(true);
    expect(every([], () => false)).toBe(true);
  });

  test("narrows the source with a type predicate", () => {
    const values: Iterable<number | string> = ["a", "b"];

    if (every(values, isString)) {
      expectTypeOf(values).toEqualTypeOf<Iterable<string>>();
    }
  });

  test("accepts a property name", () => {
    expect(every([{ on: true }, { on: 1 }], "on")).toBe(true);
    expect(every([{ on: true }, { on: 0 }], "on")).toBe(false);
  });

  test("throws on invalid arguments and passes nullish through", () => {
    expect(() => every([1], true as never)).toThrow(TypeError);
    expect(() => every(42 as never, Boolean)).toThrow(TypeError);
    expect(every(null, Boolean)).toBeUndefined();
  });
});
