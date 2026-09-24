import type { ToArrayKey } from "@auaust/toolkit/types";
import { assertType, describe, expectTypeOf, test } from "vitest";

describe("ArrayKey", () => {
  test("works", () => {
    assertType<ToArrayKey<"1">>(1);

    assertType<ToArrayKey<"length">>("length");

    expectTypeOf<ToArrayKey<PropertyKey>>().toEqualTypeOf<PropertyKey>();

    expectTypeOf<ToArrayKey<`${number}` | "split" | symbol>>().toEqualTypeOf<
      number | "split" | symbol
    >();
  });
});
