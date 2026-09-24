import type { StringToNumber } from "@auaust/toolkit/types";
import { describe, expectTypeOf, test } from "vitest";

describe("StringToNumber", () => {
  test("works", () => {
    expectTypeOf<StringToNumber<"123">>().toEqualTypeOf<123>();

    expectTypeOf<StringToNumber<`${number}`>>().toEqualTypeOf<number>();

    expectTypeOf<StringToNumber<"any">>().toBeNever();
  });
});
