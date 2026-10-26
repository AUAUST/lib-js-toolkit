import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  test,
  vi,
} from "vitest";

import { throttle, type Throttled } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => vi.useRealTimers());

  test("uses the first arguments during each cooldown", () => {
    const callback = vi.fn();
    const fn = throttle(callback, 10);

    expectTypeOf(fn).toEqualTypeOf<Throttled<typeof callback>>();

    expect(fn(1)).toBe(true);
    expect(fn(2)).toBe(false);
    expect(fn(3)).toBe(false);
    expect(callback).toHaveBeenCalledExactlyOnceWith(1);
    expect(fn.remaining()).toBe(10);

    vi.advanceTimersByTime(9);

    expect(fn.remaining()).toBe(1);
    expect(fn(4)).toBe(false);

    vi.advanceTimersByTime(1);

    expect(fn.remaining()).toBe(0);
    expect(fn(5)).toBe(true);
    expect(fn(6)).toBe(false);
    expect(callback.mock.calls).toEqual([[1], [5]]);
  });

  test("preserves receivers across cooldowns", () => {
    const context = {
      value: 42,
    };

    const callback = vi.fn(function (this: typeof context) {
      return this.value;
    });

    const fn = throttle(callback, 10);

    fn.call(context);

    fn.call(context);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback.mock.results[0].value).toBe(42);

    vi.advanceTimersByTime(10);

    fn.call(context);

    fn.call(context);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.results[1].value).toBe(42);
  });

  test("reset permits another call immediately", () => {
    const callback = vi.fn();
    const fn = throttle(callback, 10);

    fn(1);

    fn(2);

    expect(callback).toHaveBeenCalledExactlyOnceWith(1);

    fn.reset();

    expect(fn(3)).toBe(true);
    expect(fn(4)).toBe(false);
    expect(callback.mock.calls).toEqual([[1], [3]]);
  });

  test("immediate calls leave the cooldown unchanged", () => {
    const callback = vi.fn();
    const fn = throttle(callback, 10);

    expect(fn(1)).toBe(true);
    expect(fn(2)).toBe(false);
    expect(fn.immediate(3)).toBeUndefined();
    expect(fn(4)).toBe(false);
    expect(callback.mock.calls).toEqual([[1], [3]]);

    vi.advanceTimersByTime(10);

    expect(fn(5)).toBe(true);
    expect(fn(6)).toBe(false);
    expect(callback).toHaveBeenLastCalledWith(5);
  });

  test("retains callable methods and forwards arguments and receivers", () => {
    const calls: unknown[] = [];

    const callback = {
      factor: 2,
      [callable](count: number, suffix?: string) {
        calls.push([this.factor * count, suffix]);
      },
    };

    const fn = throttle(callback, 10);

    const context = {
      factor: 3,
    };

    callback[callable] = () => {
      throw new Error("retained method expected");
    };

    expectTypeOf(fn).parameter(0).toEqualTypeOf<number>();
    expectTypeOf(fn).parameter(1).toEqualTypeOf<string | undefined>();

    fn.call(context, 4, "!");

    vi.advanceTimersByTime(10);

    fn.immediate.call(undefined, 5);

    expect(calls).toEqual([
      [12, "!"],
      [10, undefined],
    ]);
  });
});
