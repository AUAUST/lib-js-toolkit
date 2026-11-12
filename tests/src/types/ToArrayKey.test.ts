import { assertType, describe, expectTypeOf, test } from "vitest";

import type { ToArrayKey } from "@auaust/toolkit/types";

describe("ToArrayKey", () => {
  test("works", () => {
    assertType<ToArrayKey<"1">>(1);

    assertType<ToArrayKey<"length">>("length");

    expectTypeOf<ToArrayKey<PropertyKey>>().toEqualTypeOf<PropertyKey>();

    expectTypeOf<ToArrayKey<`${number}` | "split" | symbol>>().toEqualTypeOf<
      number | "split" | symbol
    >();
  });
});
