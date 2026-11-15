import { describe, expect, expectTypeOf, test } from "vitest";

import { groupBy } from "@auaust/toolkit/array";
import { proto } from "@auaust/toolkit/object";

describe("groupBy", () => {
  test("creates own keys on a null-prototype record", () => {
    const items = [{ constructor: "a" }, { constructor: "b" }];
    const result = groupBy(items, "constructor");

    expect(proto(result)).toBeNull();
    expect(result).toEqual({ a: [items[0]], b: [items[1]] });

    expectTypeOf(result).toEqualTypeOf<
      Partial<Record<string, { constructor: string }[]>>
    >();
  });

  test("groups by a callback and passes nullish through", () => {
    expect(groupBy([1, 2, 3], (value) => value % 2)).toEqual({
      0: [2],
      1: [1, 3],
    });

    expect(groupBy(null, "id" as never)).toBeUndefined();
  });
});
