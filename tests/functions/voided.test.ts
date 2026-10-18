import { voided } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("voided()", () => {
  test("returns the function but ignores its return value", () => {
    expect(voided(() => 42)()).toBeUndefined();
    expectTypeOf(voided(() => 42)).toBeFunction();

    const context = {};

    const runnable = vi.fn((...args: unknown[]) => {
      expect(this).toBe(context);
      expect(args).toEqual([1, 2, 3]);

      return 42;
    });

    const fn = voided(runnable);

    expect(fn.call(context, 1, 2, 3)).toBeUndefined();

    expect(runnable).toHaveBeenCalledExactlyOnceWith(1, 2, 3);
  });
});
