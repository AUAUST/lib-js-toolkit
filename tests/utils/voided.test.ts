import { voided, type Voided } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("voided", () => {
  test("returns the function but ignores its return value", () => {
    expect(voided(() => 42)()).toBeUndefined();
    expectTypeOf(voided(() => 42)).toBeFunction();

    const runnable = vi.fn((...args: unknown[]) => {
      expect(args).toEqual([1, 2, 3]);
      return 42;
    });

    const fn = voided(runnable);

    expectTypeOf(fn).toEqualTypeOf<Voided<typeof runnable>>();

    expect(fn(1, 2, 3)).toBeUndefined();
    expect(runnable).toHaveBeenCalledExactlyOnceWith(1, 2, 3);
  });

  test("maintains the context of 'this' when called", () => {
    const context = {
      value: 42,
    };

    const fn = voided(function (this: typeof context) {
      expect(this).toBe(context);
      expect(this.value).toBe(42);
      return context.value;
    });

    fn.call(context);
  });
});
