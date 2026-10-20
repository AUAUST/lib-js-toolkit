import { after } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

describe("after", () => {
  afterEach(() => vi.useRealTimers());

  test("forwards arguments only once the delay elapses", async () => {
    vi.useFakeTimers();

    const fn = vi.fn((x: number, y: number) => x + y);
    const promise = after(fn, 100, 2, 3);

    await vi.advanceTimersByTimeAsync(99);

    expect(fn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);

    await expect(promise).resolves.toBe(5);

    expect(fn).toHaveBeenCalledExactlyOnceWith(2, 3);
  });

  test("awaits callable results and preserves optional and rest arguments", async () => {
    vi.useFakeTimers();

    const callback = {
      [callable](key: "entry", count = 1, ...values: number[]) {
        return Promise.resolve(key);
      },
    };

    const result = after(callback, 0, "entry", 2, 3);

    expectTypeOf(result).toEqualTypeOf<Promise<"entry">>();

    if (false) {
      // @ts-expect-error The optional callback argument is numeric.
      after(callback, 0, "entry", "2");
    }

    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe("entry");
  });
});
