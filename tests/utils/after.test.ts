import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

import { after } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

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

  test.each(["function", "callable"] as const)(
    "rejects synchronous %s errors without throwing from the timer",
    async (kind) => {
      vi.useFakeTimers();

      const error = new Error("Delayed failure");

      const context = {
        value: 42,
      };

      const execute = vi.fn(function (this: typeof context, suffix: string) {
        expect(this).toBe(context);
        expect(suffix).toBe("entry");

        throw error;
      });

      const callback =
        kind === "function"
          ? execute
          : {
              [callable]: execute,
            };

      const promise = after.call(context, callback, 10, "entry");

      const rejection = expect(promise).rejects.toBe(error);

      vi.advanceTimersByTime(9);

      expect(execute).not.toHaveBeenCalled();

      expect(() => {
        vi.advanceTimersByTime(1);
      }).not.toThrow();

      await rejection;

      expect(execute).toHaveBeenCalledExactlyOnceWith("entry");
    },
  );

  test("rejects when the delayed callback returns a rejected promise", async () => {
    vi.useFakeTimers();

    const error = new Error("Asynchronous failure");

    const callback = vi.fn(async () => {
      throw error;
    });

    const promise = after(callback, 10);

    const rejection = expect(promise).rejects.toBe(error);

    await vi.advanceTimersByTimeAsync(10);

    await rejection;

    expect(callback).toHaveBeenCalledOnce();
  });
});
