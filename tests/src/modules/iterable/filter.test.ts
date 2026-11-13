import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { isString } from "@auaust/toolkit/guard";
import { filter } from "@auaust/toolkit/iterable";

describe("filter", () => {
  test("keeps accepted values lazily, indexing every value read", () => {
    const predicate = vi.fn((value: number) => value % 2 === 0);
    const result = filter([1, 2, 3, 4], predicate);

    expect(predicate).toHaveBeenCalledTimes(0);
    expect([...result]).toEqual([2, 4]);

    expect(predicate.mock.calls).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
    ]);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    expect(() => filter([1], 42 as never)).toThrow(TypeError);
    expect(() => filter(42 as never, Boolean)).toThrow(TypeError);
    expect(filter(null, Boolean)).toBeUndefined();
  });

  test("narrows with a type predicate", () => {
    const result = filter([1, "a"], isString);

    expect([...result]).toEqual(["a"]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<string, undefined>>();

    expectTypeOf(filter([1, 2], Boolean)).toEqualTypeOf<
      IteratorObject<number, undefined>
    >();
  });
});
