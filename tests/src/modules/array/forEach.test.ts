import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { forEach } from "@auaust/toolkit/array";

describe("forEach", () => {
  test("calls the function with each item and its index, returning nothing", () => {
    const fn = vi.fn();
    const result = forEach(["a", "b"], fn);

    expect(result).toBeUndefined();
    expect(fn).toHaveBeenNthCalledWith(1, "a", 0, ["a", "b"]);
    expect(fn).toHaveBeenNthCalledWith(2, "b", 1, ["a", "b"]);
    expectTypeOf(forEach).returns.toBeVoid();
  });

  test("skips holes and accepts readonly arrays", () => {
    const sparse = [1];
    const visit = vi.fn();
    const fn = vi.fn((value: 1 | 2) => value);

    sparse.length = 2;

    forEach(sparse, visit);
    forEach([1, 2] as const, fn);

    expect(visit).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("calls nothing for nullish arrays and rejects invalid functions", () => {
    const fn = vi.fn();

    forEach(null, fn);

    expect(fn).not.toHaveBeenCalled();
    expect(() => forEach([1], true as never)).toThrow(TypeError);
  });
});
