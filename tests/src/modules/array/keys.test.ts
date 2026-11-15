import { describe, expect, expectTypeOf, test } from "vitest";

import { keys } from "@auaust/toolkit/array";

describe("keys", () => {
  test("iterates the indexes, holes included", () => {
    const sparse: string[] = ["a"];

    sparse.length = 3;

    expect([...keys(sparse)]).toEqual([0, 1, 2]);
    expectTypeOf(keys(sparse)).toEqualTypeOf<ArrayIterator<number>>();
  });

  test("passes nullish through", () => {
    expect(keys(null)).toBeUndefined();
  });
});
