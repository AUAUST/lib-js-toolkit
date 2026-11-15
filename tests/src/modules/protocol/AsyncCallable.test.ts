import { describe, expectTypeOf, test } from "vitest";

import type { AsyncCallable, callable } from "@auaust/toolkit/protocol";

describe("AsyncCallable", () => {
  test("requires a promise result", () => {
    expectTypeOf<{
      [callable](): Promise<number>;
    }>().toExtend<AsyncCallable<number>>();

    expectTypeOf<{
      [callable](): number;
    }>().not.toExtend<AsyncCallable<number>>();
  });
});
