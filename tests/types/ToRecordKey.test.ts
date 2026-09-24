import type { ToRecordKey } from "@auaust/toolkit/types";
import { describe, expectTypeOf, test } from "vitest";

describe("RecordKey", () => {
  test("works", () => {
    expectTypeOf<ToRecordKey<1 | "prop">>().toEqualTypeOf<"1" | "prop">();
  });
});
