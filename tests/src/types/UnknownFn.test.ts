import { describe, expectTypeOf, test } from "vitest";

import type { UnknownFn } from "@auaust/toolkit/types";

interface Window {
  closed: boolean;
}

describe("UnknownFn", () => {
  test("accepts every function", () => {
    expectTypeOf<(value: string) => string>().toExtend<UnknownFn>();
    expectTypeOf<(this: Window) => void>().toExtend<UnknownFn>();
    expectTypeOf<string>().not.toExtend<UnknownFn>();
  });

  test("accepts any arguments and returns unknown", () => {
    const fn: UnknownFn = () => 1;

    expectTypeOf(fn(1, "a")).toBeUnknown();
  });
});
