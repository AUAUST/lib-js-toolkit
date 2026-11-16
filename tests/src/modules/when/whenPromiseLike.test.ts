import { describe, expect, expectTypeOf, test } from "vitest";

import { whenPromiseLike } from "@auaust/toolkit";

describe("whenPromiseLike", () => {
  test("resolves the branch the guard selects", () => {
    // eslint-disable-next-line auaust/no-thenable -- the guard accepts only thenables
    expect(whenPromiseLike({ then() {} }, true, false)).toBe(true);
    expect(whenPromiseLike(1, true, false)).toBe(false);
  });

  test("narrows the branch types as the guard does", () => {
    const candidate = 1 as number | PromiseLike<number>;

    whenPromiseLike(
      candidate,
      (value) => expectTypeOf(value).toEqualTypeOf<PromiseLike<number>>(),
      (value) => expectTypeOf(value).toEqualTypeOf<number>(),
    );
  });
});
