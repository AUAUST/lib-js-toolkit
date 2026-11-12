import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

import { sleep } from "@auaust/toolkit";

describe("sleep", () => {
  afterEach(() => vi.useRealTimers());

  test.each([0, 1, 100])("resolves after %i milliseconds", async (delay) => {
    vi.useFakeTimers();

    const settled = vi.fn();
    const promise = sleep(delay);

    expectTypeOf(promise).toEqualTypeOf<Promise<void>>();

    void promise.then(settled);

    expect(settled).not.toHaveBeenCalled();

    if (delay > 0) {
      await vi.advanceTimersByTimeAsync(delay - 1);

      expect(settled).not.toHaveBeenCalled();
    }

    await vi.advanceTimersByTimeAsync(1);

    await expect(promise).resolves.toBeUndefined();

    expect(settled).toHaveBeenCalledExactlyOnceWith(undefined);
  });
});
