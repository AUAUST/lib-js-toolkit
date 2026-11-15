import { describe, expectTypeOf, test } from "vitest";

import type { Callable } from "@auaust/toolkit/protocol";
import type { MaybeAsyncCallee } from "@auaust/toolkit/types";

describe("MaybeAsyncCallee", () => {
  test("accepts sync, async and callable callees", () => {
    expectTypeOf<() => number>().toExtend<MaybeAsyncCallee<number>>();
    expectTypeOf<() => Promise<number>>().toExtend<MaybeAsyncCallee<number>>();
    expectTypeOf<Callable<number, []>>().toExtend<MaybeAsyncCallee<number>>();
  });

  test("rejects non-callable values", () => {
    expectTypeOf<{ value: number }>().not.toExtend<MaybeAsyncCallee<number>>();
  });
});
