import { describe, expect, expectTypeOf, test } from "vitest";

import { flat } from "@auaust/toolkit/iterable";

describe("flat", () => {
  test("flattens non-string iterable values to the given depth", () => {
    const input = [[1, [2]], new Set([3]), "ab"] as const;
    const result = flat(input);

    expect([...result]).toEqual([1, [2], 3, "ab"]);
    expect([...flat(input, Infinity)]).toEqual([1, 2, 3, "ab"]);
    expect([...flat(input, 0)]).toEqual(input);
    expect([...flat(input, -1)]).toEqual(input);
    expect([...flat(input, Number.NaN)]).toEqual(input);

    expectTypeOf(flat([[1, [2]]] as number[][][])).toEqualTypeOf<
      IteratorObject<number[], undefined>
    >();
  });

  test("reads the source once, lazily", () => {
    let pulls = 0;

    function* source() {
      pulls++;

      yield [1, 2];
    }

    const result = flat(source());

    expect(pulls).toBe(0);
    expect(new Set(result)).toEqual(new Set([1, 2]));
    expect(pulls).toBe(1);
  });

  test("throws eagerly on a non-iterable source and passes nullish through", () => {
    expect(() => flat(42 as never)).toThrow(TypeError);
    expect(flat(null)).toBeUndefined();
  });
});
