import { describe, expectTypeOf, test } from "vitest";

import type { ToRecordKey } from "@auaust/toolkit/types";

describe("ToRecordKey", () => {
  test("works", () => {
    expectTypeOf<ToRecordKey<1 | "prop">>().toEqualTypeOf<"1" | "prop">();
  });
});
