import { describe, expect, expectTypeOf, test } from "vitest";

import { intersection } from "@auaust/toolkit/array";

describe("intersection", () => {
  test("keeps the first input's order and duplicates", () => {
    const result = intersection([2, 1, 2, 3], new Set([2, 3]));

    expect(result).toEqual([2, 2, 3]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("passes nullish through", () => {
    expect(intersection(null, [])).toBeUndefined();
  });

  test("copies any iterable but a string", () => {
    const result = intersection(new Set([1, 2, 3]), [2]);

    expect(result).toEqual([2]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
    expect(() => intersection({} as never, [])).toThrow(TypeError);
  });
});
