import { measureAsync, sleep } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { assert, describe, expect, expectTypeOf, test, vi } from "vitest";

describe("measureAsync()", () => {
  test("returns the result of a successful function call along with the duration", async () => {
    const fn = vi.fn(async (x: number, y: number) => x + y || String(x));

    const measuring = measureAsync(fn, 2, 3);

    expect(measuring).toBeInstanceOf(Promise);

    expectTypeOf(measuring).toExtend<
      Promise<{
        result: number | string;
      }>
    >();

    const { result, duration } = await measuring;

    expect(result).toBe(5);

    expectTypeOf(result).toEqualTypeOf<number | string>();

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

    expectTypeOf(measuring).toExtend<
      Promise<{
        result: number;
      }>
    >();

    const { result, duration } = await measuring;

    expect(result).toBe(5);

    expectTypeOf(result).toEqualTypeOf<number>();

    expect(typeof duration).toBe("number");

    expect(duration).toBeGreaterThanOrEqual(0);

    expect(fn).toHaveBeenCalledWith(2, 3);
  });

  test("supports `Callable` objects", async () => {
    const fn = vi.fn(function (
      this: { initial: number },
      x: number,
      y: number,
    ) {
      if (typeof this.initial !== "number") {
        throw new Error("initial must be a number");
      }

      return this.initial + x + y;
    });

    await expect(
      async () => await measureAsync({ [callable]: fn }, 2, 3),
    ).rejects.toThrow("initial must be a number");

    const context = { initial: 1 };

    fn.mockImplementation(function (
      this: { initial: number },
      x: number,
      y: number,
    ) {
      assert(
        this === context,
        "bound calls should pass the `this` context to the callback",
      );

      return this.initial + x + y;
    });

    const measuring = measureAsync.call(context, { [callable]: fn }, 2, 3);

    expect(fn).toHaveBeenCalledWith(2, 3);

    expect(measuring).toBeInstanceOf(Promise);

    const { result, duration } = await measuring;

    expect(result).toBe(6);

    expect(typeof duration).toBe("number");

    expect(duration).toBeGreaterThanOrEqual(0);

    expect(duration).toBeLessThan(10);
  });
});
