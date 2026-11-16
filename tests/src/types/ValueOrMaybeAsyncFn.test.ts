import { describe, expectTypeOf, test } from "vitest";

import type { ValueOrMaybeAsyncFn } from "@auaust/toolkit/types";

describe("ValueOrMaybeAsyncFn", () => {
  test("accepts a value or a function returning it synchronously or asynchronously", () => {
    expectTypeOf<1>().toExtend<ValueOrMaybeAsyncFn<number>>();
    expectTypeOf<() => 1>().toExtend<ValueOrMaybeAsyncFn<number>>();
    expectTypeOf<() => Promise<1>>().toExtend<ValueOrMaybeAsyncFn<number>>();
  });

  test("rejects a bare promise and a function returning another type", () => {
    expectTypeOf<Promise<number>>().not.toExtend<ValueOrMaybeAsyncFn<number>>();
    expectTypeOf<() => "a">().not.toExtend<ValueOrMaybeAsyncFn<number>>();
  });
});
