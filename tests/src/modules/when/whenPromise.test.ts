import { describe, expect, expectTypeOf, test } from "vitest";

import { whenPromise } from "@auaust/toolkit";

describe("whenPromise", () => {
  test("resolves the branch the guard selects", () => {
    expect(whenPromise(Promise.resolve(1), true, false)).toBe(true);
    expect(whenPromise(1)).toBeUndefined();
  });

  test("narrows the branch types as the guard does", () => {
    const candidate = 1 as number | Promise<number>;

    whenPromise(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<Promise<number>>(),
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
    );
  });
});
