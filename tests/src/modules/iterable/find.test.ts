import { describe, expect, expectTypeOf, test } from "vitest";

import { isString } from "@auaust/toolkit/guard";
import { find } from "@auaust/toolkit/iterable";

describe("find", () => {
  test("returns the first accepted value and closes the source", () => {
    let closed = false;
    let read = 0;

    function* source() {
      try {
        yield 1;

        read++;

        yield 2;

        read++;

        yield 3;
      } finally {
        closed = true;
      }
    }

    expect(find(source(), (value) => value === 2)).toBe(2);
    expect(read).toBe(1);
    expect(closed).toBe(true);
    expect(find([1, 2], (value) => value > 5)).toBeUndefined();
  });

  test("narrows with a type predicate", () => {
    const result = find([1, "a"], isString);

    expect(result).toBe("a");
    expectTypeOf(result).toEqualTypeOf<string | undefined>();
  });

  test("returns the first value whose named member is truthy", () => {
    const items = [
      { active: false, id: 1 },
      { active: true, id: 2 },
    ];

    expect(find(items, "active")).toBe(items[1]);

    // @ts-expect-error `missing` is not a member of the items
    find(items, "missing");
  });

  test("throws on invalid arguments and passes nullish through", () => {
    expect(() => find([1], true as never)).toThrow(TypeError);
    expect(() => find(42 as never, Boolean)).toThrow(TypeError);
    expect(find(null, Boolean)).toBeUndefined();
  });
});
