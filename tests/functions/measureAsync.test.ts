import { measureAsync, sleep } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("measureAsync()", () => {
  test("returns the result of a successful function call along with the duration", async () => {
    const fn = vi.fn(async (x: number, y: number) => x + y);

    const measuring = measureAsync(fn, 2, 3);

    expect(measuring).toBeInstanceOf(Promise);

    const { result, duration } = await measuring;

    expect(result).toBe(5);
    expect(typeof duration).toBe("number");
    expect(duration).toBeGreaterThanOrEqual(0);
    expect(duration).toBeLessThan(10); // 10 is already quite high for such a simple function, but constrains the tests the scale
    expect(fn).toHaveBeenCalledWith(2, 3);
  });

  test("measures asynchronous functions correctly", async () => {
    const measuring = measureAsync(() => sleep(25));

    expect(measuring).toBeInstanceOf(Promise);

    const { duration } = await measuring;

    expect(typeof duration).toBe("number");
    expect(duration).toBeGreaterThanOrEqual(20);
    expect(duration).toBeLessThan(30);
  });

  test("handles synchronous functions as well", async () => {
    const fn = vi.fn((x: number, y: number) => x + y);

    const measuring = measureAsync(fn, 2, 3);

    expect(measuring).toBeInstanceOf(Promise);

    const { result, duration } = await measuring;

    expect(result).toBe(5);
    expect(typeof duration).toBe("number");
    expect(duration).toBeGreaterThanOrEqual(0);
    expect(fn).toHaveBeenCalledWith(2, 3);
  });
});
