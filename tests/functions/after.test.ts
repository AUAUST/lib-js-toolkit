import { after } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("after()", () => {
  test("returns a promise that calls the closure and resolves after the specified time", async () => {
    const fn = vi.fn((x: number, y: number) => x + y);

    const start = Date.now();

    return after(fn, 100, 2, 3).then((result) => {
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(98); // Allowing a small margin of error
      expect(result).toBe(5);
      expect(fn).toHaveBeenCalledWith(2, 3);
    });
  });

  test("infers awaited return types from callable callbacks", async () => {
    const callback = {
      [callable](key: "entry", ...values: number[]) {
        return Promise.resolve(key);
      },
    };

    const result = after(callback, 0, "entry");

    expectTypeOf(result).toEqualTypeOf<Promise<"entry">>();

    expect(await result).toBe("entry");
  });

  test("preserves optional callback argument types", () => {
    function callback(first: "entry", count = 1, ...values: number[]) {
      return first.length + count + values.length;
    }

    if (false) {
      // @ts-expect-error The optional callback argument is numeric.
      after(callback, 0, "entry", "2");
    }
  });
});
