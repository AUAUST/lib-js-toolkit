import { tap } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("tap()", () => {
  test("calls the provided function with the value and returns the value", () => {
    const value = 42;
    const callback = vi.fn();

    const result = tap(value, callback);

    expect(callback).toHaveBeenCalledWith(value);
    expect(result).toBe(value);
  });

  test("preserves 'this' context in the callback", () => {
    const context = { multiplier: 2 };
    const value = 21;

    function callback(this: typeof context, val: number) {
      expect(this).toBe(context);
      expect(val * this.multiplier).toBe(42);
    }

    // The type level of `fn.call` is too poor to infer `this` correctly here
    // so we any-ify it to ensure the runtime behavior is still tested.
    tap.call<any, any, any>(context, value, callback);
  });
});
