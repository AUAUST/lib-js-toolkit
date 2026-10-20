import type { ToRecordKey } from "@auaust/toolkit/types";
import { describe, expectTypeOf, test } from "vitest";

describe("ToRecordKey", () => {
  test("works", () => {
    expectTypeOf<ToRecordKey<1 | "prop">>().toEqualTypeOf<"1" | "prop">();
  });
});
