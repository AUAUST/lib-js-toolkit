import { describe, expectTypeOf, test } from "vitest";

import type { Is } from "@auaust/toolkit/types";

describe("Is", () => {
  test("resolves after whether both types are the same", () => {
    expectTypeOf<Is<string, string, 1, 0>>().toEqualTypeOf<1>();
    expectTypeOf<Is<"a", string, 1, 0>>().toEqualTypeOf<0>();
    expectTypeOf<Is<any, string, 1, 0>>().toEqualTypeOf<0>();
  });
});
