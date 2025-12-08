import { when } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("when()", () => {
  test("returns the callback result when the condition is true", () => {
    const callback = vi.fn(() => "Callback Result");
    const fallback = vi.fn(() => "Fallback Result");

    expect(when(true, callback, fallback)).toBe("Callback Result");

    expect(callback).toHaveBeenCalledOnce();
    expect(fallback).not.toHaveBeenCalled();
  });

  test("returns the fallback result when the condition is false", () => {
    const callback = vi.fn(() => "Callback Result");
    const fallback = vi.fn(() => "Fallback Result");

    expect(when(false, callback, fallback)).toBe("Fallback Result");

    expect(callback).not.toHaveBeenCalled();
    expect(fallback).toHaveBeenCalledOnce();
  });

  test("returns undefined when the condition is false and no fallback is provided", () => {
    const callback = vi.fn(() => "Callback Result");

    expect(when(false, callback)).toBeUndefined();

    expect(callback).not.toHaveBeenCalled();
  });

  test("handles callbacks on all arguments", () => {
    const condition = vi.fn(() => false);
    const callback = vi.fn(() => "Callback Result");
    const fallback = vi.fn(() => "Fallback Result");

    expect(when(condition, callback, fallback)).toBe("Fallback Result");

    expect(condition).toHaveBeenCalledOnce();
    expect(callback).not.toHaveBeenCalled();
    expect(fallback).toHaveBeenCalledOnce();

    condition.mockReturnValue(true);

    expect(when(condition, callback, fallback)).toBe("Callback Result");

    expect(condition).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledOnce();
    expect(fallback).toHaveBeenCalledOnce();
  });

  test("preserves 'this' context in callbacks", () => {
    const context = { value: 42 };

    function condition(this: typeof context) {
      return this.value === 42;
    }

    function callback(this: typeof context) {
      return this.value + 1;
    }

    function fallback(this: typeof context) {
      return this.value - 1;
    }

    expect(when.call(context, condition, callback, fallback)).toBe(43);
    expect(when.call({ value: 0 }, condition, callback, fallback)).toBe(-1);
  });
});
