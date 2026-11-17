import { describe, expect, expectTypeOf, test } from "vitest";

import { chunk } from "@auaust/toolkit/iterable";

describe("chunk", () => {
  test("yields full batches and the shorter remainder last", () => {
    expect([...chunk([1, 2, 3, 4, 5], 2)]).toEqual([[1, 2], [3, 4], [5]]);
    expect([...chunk([], 2)]).toEqual([]);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    for (const size of [0, 1.5, Number.NaN]) {
      expect(() => chunk([1], size)).toThrow(RangeError);
    }

    expect(() => chunk(42 as never, 2)).toThrow(TypeError);
    expect(chunk(null, 2)).toBeUndefined();
  });

  test("types batches of a readonly tuple as item arrays", () => {
    const tuple = [1, 2, 3] as const;

    expectTypeOf(chunk(tuple, 2)).toEqualTypeOf<
      IteratorObject<(1 | 2 | 3)[], undefined>
    >();
  });

  test("pulls an infinite source only as far as needed", () => {
    function* naturals() {
      let value = 0;

      while (true) {
        yield value++;
      }
    }

    const batches = chunk(naturals(), 3);

    expect(batches.next().value).toEqual([0, 1, 2]);
    expect(batches.next().value).toEqual([3, 4, 5]);
  });
});
