import { describe, expect, expectTypeOf, test } from "vitest";

import { AssertionError } from "@auaust/toolkit";
import { ensure, not } from "@auaust/toolkit/ensure";
import { isString } from "@auaust/toolkit/guard";

describe("not", () => {
  test("returns the candidate when the guard fails", () => {
    expect(not(isString, 1)).toBe(1);
    expect(() => not(isString, "a")).toThrow(AssertionError);
    expect(() => not(isString, "a")).toThrow("Expected the guard to fail.");
  });

  test("removes the guarded members of the candidate", () => {
    expectTypeOf((candidate: "a" | 1) => {
      return ensure.not(isString, candidate);
    }).returns.toEqualTypeOf<1>();
  });
});
