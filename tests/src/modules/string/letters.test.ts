import { describe, expectTypeOf, test } from "vitest";

import type { LowerLetter, UpperLetter } from "@auaust/toolkit/string";

describe("LowerLetter and UpperLetter", () => {
  test("accept letters of their case", () => {
    expectTypeOf<"a">().toExtend<LowerLetter>();
    expectTypeOf<"Z">().toExtend<UpperLetter>();
  });

  test("reject letters of the other case", () => {
    expectTypeOf<"A">().not.toExtend<LowerLetter>();
  });
});
