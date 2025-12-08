import { debounce, sleep } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("debounce()", () => {
  test("delays function execution by specified milliseconds", async () => {
    const callback = vi.fn();

    const debouncedFunction = debounce(callback, 5);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    expect(callback).not.toHaveBeenCalled();

    await sleep(10);

    expect(callback).toHaveBeenCalledOnce();
  });

  test("uses the latest arguments when called multiple times", async () => {
    const callback = vi.fn();

    const debouncedFunction = debounce(callback, 5);

    debouncedFunction(1);
    debouncedFunction(2);
    debouncedFunction(3);

    expect(callback).not.toHaveBeenCalled();

    await sleep(10);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(3);
  });

  test("maintains the context of 'this' when called", async () => {
    const context = { value: 42 };
    const callback = vi.fn(function (this: typeof context) {
      return this.value;
    });

    const debouncedFunction = debounce(callback, 5);

    debouncedFunction.call(context);
    debouncedFunction.call(context);
    debouncedFunction.call(context);

    expect(callback).not.toHaveBeenCalled();

    await sleep(10);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback.mock.results[0].value).toBe(42);
  });
});
