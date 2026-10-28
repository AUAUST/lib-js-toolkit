import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

import { measureAsync, sleep, type MeasureResult } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("measureAsync", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test.each([false, true])(
    "measures a callback with asynchronous return %s",
    async (asynchronous) => {
      vi.spyOn(performance, "now").mockReturnValueOnce(10).mockReturnValue(35);

      const fn = vi.fn((x: number, y: number) => {
        return asynchronous ? Promise.resolve(x + y) : x + y;
      });

      const measuring = measureAsync(fn, 2, 3);

      expect(measuring).toBeInstanceOf(Promise);
      expectTypeOf(measuring).toEqualTypeOf<Promise<MeasureResult<number>>>();

      await expect(measuring).resolves.toEqual({
        result: 5,
        start: 10,
        end: 35,
        duration: 25,
      });

      expect(fn).toHaveBeenCalledExactlyOnceWith(2, 3);
    },
  );

  test("waits for asynchronous work before stopping the clock", async () => {
    vi.useFakeTimers({
      toFake: ["performance", "setTimeout"],
    });

    const measuring = measureAsync(() => sleep(25));

    await vi.advanceTimersByTimeAsync(25);

    expect((await measuring).duration).toBe(25);
  });

  test("preserves callable receivers, argument lists, and awaited literal types", async () => {
    const callback = {
      initial: 1,
      [callable](key: "entry", ...values: number[]) {
        return Promise.resolve(
          `${key}:${this.initial + values.length}` as const,
        );
      },
    };

    const result = measureAsync(callback, "entry", 2, 3);

    expectTypeOf(result).toEqualTypeOf<
      Promise<MeasureResult<`entry:${number}`>>
    >();

    expect((await result).result).toBe("entry:3");

    expect(
      (
        await measureAsync.call(
          {
            initial: 10,
          },
          callback,
          "entry" as const,
        )
      ).result,
    ).toBe("entry:10");
  });

  test("propagates callback failures", async () => {
    const failure = new Error("failure");

    await expect(
      measureAsync(() => {
        throw failure;
      }),
    ).rejects.toBe(failure);

    await expect(
      measureAsync(async () => {
        throw failure;
      }),
    ).rejects.toBe(failure);
  });
});
