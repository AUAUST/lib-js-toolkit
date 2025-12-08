import { sleep, throttle } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

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
});
