import type { IsNumericString } from "@auaust/toolkit/types";
import { assertType, describe, expectTypeOf, test } from "vitest";

describe("IsNumericString", () => {
  test("works", () => {
    assertType<IsNumericString<"123">>(true);

    assertType<IsNumericString<`${number}`>>(true);

    assertType<IsNumericString<string>>(false);

    assertType<IsNumericString<"123abc">>(false);

    assertType<IsNumericString<"123", "yes", "no">>("yes");

    assertType<IsNumericString<"123abc", "yes", "no">>("no");

    expectTypeOf<
      IsNumericString<`${number}` | "foo", "numeric", "not numeric">
    >().toEqualTypeOf<"numeric" | "not numeric">();
  });
});
