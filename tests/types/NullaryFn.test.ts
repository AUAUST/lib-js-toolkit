import { describe, expectTypeOf, test } from "vitest";

import type { NullaryFn } from "@auaust/toolkit/types";

describe("NullaryFn", () => {
  test("has no arguments and preserves its return and receiver types", () => {
    type Callback = NullaryFn<"value", { count: number }>;

    expectTypeOf<Parameters<Callback>>().toEqualTypeOf<[]>();
    expectTypeOf<ReturnType<Callback>>().toEqualTypeOf<"value">();
    expectTypeOf<ThisParameterType<Callback>>().toEqualTypeOf<{
      count: number;
    }>();
    expectTypeOf<(value: number) => void>().not.toExtend<NullaryFn>();
  });
});
