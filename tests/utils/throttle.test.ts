import { callable } from "@auaust/toolkit/protocols/callable";
import { sleep, throttle } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("throttle()", () => {
  test("ensures a function is called at most once in the specified wait time", async () => {
    const callback = vi.fn();

    const throttledFunction = throttle(callback, 5);

    throttledFunction(1);
    throttledFunction(2);
    throttledFunction(3);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(1);

    await sleep(10);

    throttledFunction(4);
    throttledFunction(5);
    throttledFunction(6);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith(4);
  });

  test("maintains the context of 'this' when called", async () => {
    const context = { value: 42 };
    const callback = vi.fn(function (this: typeof context) {
      return this.value;
    });

    const throttledFunction = throttle(callback, 5);

    throttledFunction.call(context);
    throttledFunction.call(context);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback.mock.results[0].value).toBe(42);

    await sleep(10);

    throttledFunction.call(context);
    throttledFunction.call(context);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.results[1].value).toBe(42);
  });

  test("returns true if the call actually happened and false if throttled", async () => {
    const callback = vi.fn();

    const throttledFunction = throttle(callback, 5);

    const firstCall = throttledFunction(1);
    const secondCall = throttledFunction(2);

    expect(firstCall).toBe(true);
    expect(secondCall).toBe(false);

    await sleep(10);

    const thirdCall = throttledFunction(3);
    const fourthCall = throttledFunction(4);
    const fifthCall = throttledFunction(5);

    expect(thirdCall).toBe(true);
    expect(fourthCall).toBe(false);
    expect(fifthCall).toBe(false);
  });

  test("supports resetting to allow immediate subsequent calls", async () => {
    const callback = vi.fn();

    const throttledFunction = throttle(callback, 5);

    throttledFunction(1);
    throttledFunction(2);

    expect(callback).toHaveBeenCalledExactlyOnceWith(1);

    throttledFunction.reset();

    const thirdCall = throttledFunction(3);
    const fourthCall = throttledFunction(4);

    expect(thirdCall).toBe(true);
    expect(fourthCall).toBe(false);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith(3);
  });

  test("supports immediate calls that do not affect the throttling behavior", async () => {
    const callback = vi.fn();

    const throttledFunction = throttle(callback, 5);

    const firstCall = throttledFunction(1);
    const secondCall = throttledFunction(2);
    const thirdCall = throttledFunction.immediate(3);

    expect(firstCall).toBe(true);
    expect(secondCall).toBe(false);
    expect(thirdCall).toBeUndefined();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls).toEqual([[1], [3]]);

    await sleep(10);

    const fourthCall = throttledFunction(4);
    const fifthCall = throttledFunction(5);

    expect(fourthCall).toBe(true);
    expect(fifthCall).toBe(false);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenLastCalledWith(4);
  });

  test("exposes the remaining cooldown", async () => {
    const callback = vi.fn();

    const throttledFunction = throttle(callback, 5);

    throttledFunction(1);

    const before = throttledFunction.remaining();

    expect(before).toBeGreaterThan(0);

    await sleep(10);

    const after = throttledFunction.remaining();

    expect(after).toBe(0);
  });

  test("resolves retained callbacks and preserves receivers and arguments", () => {
    vi.useFakeTimers();

    try {
      const calls: unknown[] = [];
      const callback = {
        factor: 2,
        [callable](count: number, suffix?: string) {
          calls.push([this.factor * count, suffix]);
        },
      };
      const wrapped = throttle(callback, 10);
      const context = {
        factor: 3,
      };

      callback[callable] = () => {
        throw new Error("The retained method should be used");
      };

      expectTypeOf(wrapped).parameter(0).toEqualTypeOf<number>();
      expectTypeOf(wrapped).parameter(1).toEqualTypeOf<string | undefined>();

      wrapped.call(context, 4, "!");
      vi.advanceTimersByTime(10);
      wrapped.immediate.call(undefined, 5);

      expect(calls).toEqual([[12, "!"], [10, undefined]]);
    } finally {
      vi.useRealTimers();
    }
  });
});
