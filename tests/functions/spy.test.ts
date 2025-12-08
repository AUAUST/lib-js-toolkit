import { spy } from "@auaust/toolkit";
import { describe, expect, test, vi } from "vitest";

describe("spy()", () => {
  test("calls the before listener before the closure", () => {
    const closure = vi.fn((x: number) => x * 2);
    const before = vi.fn();

    const spiedFunction = spy(closure, before);

    const result = spiedFunction(5);

    expect(result).toBe(10);
    expect(before).toHaveBeenCalledBefore(closure);
    expect(before).toHaveBeenCalledWith(5);
  });

  test("calls the after listener after the closure", () => {
    const closure = vi.fn((x: number) => x * 2);
    const after = vi.fn();

    const spiedFunction = spy(closure, null, after);

    const result = spiedFunction(5);

    expect(result).toBe(10);
    expect(after).toHaveBeenCalledAfter(closure);
    expect(after).toHaveBeenCalledWith(10, 5);
    expect(after).toHaveBeenCalledOnce();
  });

  test("calls both before and after listeners when provided", () => {
    const closure = vi.fn((x: number) => x * 2);
    const before = vi.fn();
    const after = vi.fn();

    const spiedFunction = spy(closure, before, after);

    const result = spiedFunction(5);

    expect(result).toBe(10);
    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
    expect(before).toHaveBeenCalledWith(5);
    expect(after).toHaveBeenCalledWith(10, 5);
  });

  test("forwards the 'this' context to the closure and listeners", () => {
    const obj = {
      factor: 2,
      method(this: { factor: number }, x: number) {
        expect(this).toBe(obj);
        return x * this.factor;
      },
    };

    const before = vi.fn(function (this: typeof obj) {
      expect(this).toBe(obj);
    });

    const after = vi.fn(function (this: typeof obj, result: number) {
      expect(this).toBe(obj);
      expect(result).toBe(10);
    });

    const spiedFunction = spy(obj.method, before, after);

    const result = spiedFunction.call(obj, 5);

    expect(result).toBe(10);
  });
});
