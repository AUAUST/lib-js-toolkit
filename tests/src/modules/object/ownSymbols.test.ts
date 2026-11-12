import { describe, expect, expectTypeOf, test } from "vitest";

import { ownSymbols } from "@auaust/toolkit/object";

describe("ownSymbols", () => {
  test("infers known symbol keys", () => {
    const symbol = Symbol("key");

    const target = {
      value: 1,
      [symbol]: 2,
    };

    const result = ownSymbols(target);

    expectTypeOf(result).toEqualTypeOf<(typeof symbol)[]>();
    expect(result).toContain(symbol);
    expect(ownSymbols(undefined!)).toEqual([]);
  });
});
