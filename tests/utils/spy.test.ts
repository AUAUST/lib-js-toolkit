import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { spy } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("spy", () => {
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
    const object = {
      factor: 2,
      method(this: { factor: number }, x: number) {
        expect(this).toBe(object);

        return x * this.factor;
      },
    };

    const before = vi.fn(function (this: typeof object) {
      expect(this).toBe(object);
    });

    const after = vi.fn(function (this: typeof object, result: number) {
      expect(this).toBe(object);
      expect(result).toBe(10);
    });

    const spiedFunction = spy(object.method, before, after);
    const result = spiedFunction.call(object, 5);

    expect(result).toBe(10);
  });

  test("handles null or undefined closure gracefully", () => {
    const before = vi.fn();
    const after = vi.fn();
    const spiedFunction = spy(null, before, after);
    const result = spiedFunction();

    expect(result).toBeUndefined();
    expect(before).toHaveBeenCalledWith();
    expect(after).toHaveBeenCalledWith(undefined);
  });

  test("infers spy receivers, hook arguments, and absent callback results", () => {
    function callback(this: { value: number }, count: number, suffix = "") {
      return `${this.value + count}${suffix}`;
    }

    const wrapped = spy(
      callback,
      function (count, suffix) {
        expectTypeOf(this).toEqualTypeOf<{ value: number }>();
        expectTypeOf(count).toEqualTypeOf<number>();
        expectTypeOf(suffix).toEqualTypeOf<string | undefined>();
      },
      function (result) {
        expectTypeOf(result).toEqualTypeOf<string>();
      },
    );

    const absent = spy(null);

    expectTypeOf(absent()).toEqualTypeOf<undefined>();

    const context = {
      value: 2,
    };

    expect(wrapped.call(context, 3, "!")).toBe("5!");
  });

  test("resolves callbacks and hooks with their own default receivers", () => {
    const calls: unknown[] = [];

    const callback = {
      factor: 2,
      [callable](count: number, suffix = "") {
        return `${this.factor * count}${suffix}`;
      },
    };

    const before = {
      label: "before",
      [callable](count: number, suffix?: string) {
        calls.push([this.label, count, suffix]);
      },
    };

    const after = {
      label: "after",
      [callable](result: string, count: number, suffix?: string) {
        calls.push([this.label, result, count, suffix]);
      },
    };

    const wrapped = spy(callback, before, after);

    callback[callable] = () => "changed";

    expectTypeOf(wrapped).toEqualTypeOf<(typeof callback)[typeof callable]>();
    expect(wrapped(4, "!")).toBe("8!");

    expect(calls).toEqual([
      ["before", 4, "!"],
      ["after", "8!", 4, "!"],
    ]);

    const absent = spy(null, undefined, {
      [callable](result) {
        expectTypeOf(result).toEqualTypeOf<undefined>();
      },
    });

    expect(absent()).toBeUndefined();
  });
});
