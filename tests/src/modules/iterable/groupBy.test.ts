import { describe, expect, expectTypeOf, test } from "vitest";

import { groupBy } from "@auaust/toolkit/iterable";
import { proto } from "@auaust/toolkit/object";

describe("groupBy", () => {
  test("groups values by the keyer's result, in order", () => {
    const result = groupBy([1, 2, 3, 4], (value) => {
      return value % 2 === 0 ? "even" : "odd";
    });

    expect(result).toEqual({ odd: [1, 3], even: [2, 4] });

    expectTypeOf(result).toEqualTypeOf<
      Partial<Record<"even" | "odd", number[]>>
    >();
  });

  test("creates own keys on a null-prototype record", () => {
    const items = [{ constructor: "a" }, { constructor: "a" }];
    const result = groupBy(items, "constructor");

    expect(proto(result)).toBeNull();
    expect(Object.hasOwn(result, "a")).toBe(true);
    expect(result.a).toEqual(items);

    expectTypeOf(result).toEqualTypeOf<
      Partial<Record<string, { constructor: string }[]>>
    >();
  });

  test("throws on invalid arguments and passes nullish through", () => {
    expect(() => groupBy(42 as never, "id" as never)).toThrow(TypeError);
    expect(groupBy(null, "id" as never)).toBeUndefined();
  });
});
