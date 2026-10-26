import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  test,
  vi,
} from "vitest";

import { debounce } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => vi.useRealTimers());

  test.for([[], [1], [1, 2, 3]])(
    "coalesces calls using the last arguments %s",
    (args) => {
      const callback = vi.fn();
      const fn = debounce(callback, 10);

      expect(fn(...args)).toBe(false);
      expect(fn(...args)).toBe(true);
      expect(fn("latest")).toBe(true);
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(9);

      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);

      expect(callback).toHaveBeenCalledExactlyOnceWith("latest");
      expect(fn(...args)).toBe(false);
      expect(fn(...args)).toBe(true);

      vi.advanceTimersByTime(10);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenLastCalledWith(...args);
    },
  );

  test("preserves function receivers", () => {
    const context = {
      value: 42,
    };

    const callback = vi.fn(function (this: typeof context) {
      return this.value;
    });

    const fn = debounce(callback, 10);

    fn.call(context);

    fn.call(context);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(10);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback.mock.results[0].value).toBe(42);
  });

  test("retains callable methods and forwards arguments and receivers", () => {
    const calls: unknown[] = [];

    const callback = {
      factor: 2,
      [callable](count: number, suffix?: string) {
        calls.push([this.factor * count, suffix]);
      },
    };

    const fn = debounce(callback, 10);

    const context = {
      factor: 3,
    };

    callback[callable] = () => {
      throw new Error("retained method expected");
    };

    expectTypeOf(fn).parameter(0).toEqualTypeOf<number>();
    expectTypeOf(fn).parameter(1).toEqualTypeOf<string | undefined>();

    fn.call(context, 4, "!");

    expect(fn.flush()).toBe(true);

    fn.immediate.call(undefined, 5);

    expect(calls).toEqual([
      [12, "!"],
      [10, undefined],
    ]);
  });
});
