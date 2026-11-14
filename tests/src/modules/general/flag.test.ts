import { describe, expect, expectTypeOf, test } from "vitest";

import { flag } from "@auaust/toolkit";

interface Options {
  step?: number;
  clamp?: boolean;
}

describe("flag", () => {
  test("returns an options object as is", () => {
    const options: Options = { step: 2, clamp: true };
    const result = flag<Options, "step">(options, "step");

    expect(result).toBe(options);
    expectTypeOf(result).toEqualTypeOf<Options>();
  });

  test("wraps a primitive under the canonical property", () => {
    expect(flag<Options, "step">(3, "step")).toEqual({ step: 3 });
  });

  test("gives an empty object for undefined", () => {
    expect(flag<Options, "step">(undefined, "step")).toEqual({});
  });
});
