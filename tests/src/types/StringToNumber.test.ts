import { describe, expectTypeOf, test } from "vitest";

import type { StringToNumber } from "@auaust/toolkit/types";

describe("StringToNumber", () => {
  test("works", () => {
    expectTypeOf<StringToNumber<"123">>().toEqualTypeOf<123>();
    expectTypeOf<StringToNumber<`${number}`>>().toEqualTypeOf<number>();
    expectTypeOf<StringToNumber<"any">>().toBeNever();
  });
});
