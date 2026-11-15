import { describe, expectTypeOf, test } from "vitest";

import type { UnknownFn } from "@auaust/toolkit/types";

interface Window {
  closed: boolean;
}

describe("UnknownFn", () => {
  test("accepts functions declaring a this type", () => {
    expectTypeOf<(this: Window) => void>().toExtend<UnknownFn>();
    expectTypeOf<string>().not.toExtend<UnknownFn>();
  });
});
