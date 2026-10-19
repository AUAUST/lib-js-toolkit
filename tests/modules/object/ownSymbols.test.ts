import { ownSymbols } from "@auaust/toolkit/object";
import { expect, expectTypeOf, test } from "vitest";

test("ownSymbols() infers known symbol keys", () => {
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
