import { describe, expectTypeOf, test } from "vitest";

import type { AsyncFn, MaybeAsyncFn } from "@auaust/toolkit/types";

describe("AsyncFn", () => {
  test("requires a promise result", () => {
    expectTypeOf<() => Promise<number>>().toExtend<AsyncFn<number>>();
    expectTypeOf<() => number>().not.toExtend<AsyncFn<number>>();
  });

  test("leaves MaybeAsyncFn accepting a sync result", () => {
    expectTypeOf<() => number>().toExtend<MaybeAsyncFn<number>>();
    expectTypeOf<() => Promise<number>>().toExtend<MaybeAsyncFn<number>>();
  });
});
