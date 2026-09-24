import { apply, call } from "@auaust/toolkit";
import { callable, type Callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test, vi } from "vitest";

describe("call()", () => {
  test("executes the given callback", () => {
    expect(call(() => 42)).toBe(42);
  });

  test("forwards the arguments to the callback", () => {
    expect(call((a: number, b: number) => a + b, 1, 2)).toBe(3);
  });

  test("throws a TypeError if the input is not callable", () => {
    // @ts-expect-error
    expect(() => call(42)).toThrow(TypeError);
  });

  test("uses the provided this context when calling the function", () => {
    const context = { value: 42 };

    function fn(this: typeof context) {
      return this.value;
    }

    expect(call.call(context, fn)).toBe(42);
  });

  test("supports the `Callable` protocol", () => {
    const object = {
      [callable]: function () {
        return this;
      },
    };

    expect(call(object)).toBe(object);

    expect(call.call(1, object)).toBe(1);
  });

  test("a function that also implements `Callable` uses the `Callable` protocol first", () => {
    const fn = vi.fn(function (this: any) {
      return 1;
    } as (() => any) & Callable);

    expect(fn()).toBe(1);

    expect(call(fn)).toBe(1);

    expect(fn).toHaveBeenCalledTimes(2);

    fn[callable] = function () {
      return this;
    };

    expect(fn()).toBe(1);

    expect(call(fn)).toBe(fn);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  test("preserves argument and return types through native call and apply", () => {
    const input = {
      [callable](value: number, suffix: string) {
        return `${value}${suffix}`;
      },
    };

    expectTypeOf(call(input, 1, "!")).toEqualTypeOf<string>();

    expectTypeOf(call.call(null, input, 1, "!")).toEqualTypeOf<string>();

    expectTypeOf(call.apply(null, [input, 1, "!"])).toEqualTypeOf<string>();

    expectTypeOf(call.call(null, (n: number) => n, 1)).toEqualTypeOf<number>();

    if (false) {
      // @ts-expect-error Missing required argument.
      call.call(null, input, 1);
      // @ts-expect-error Incorrect argument type.
      call.call(null, input, "1", "!");
      // @ts-expect-error Incorrect argument type through native apply.
      call.apply(null, [input, false, "!"]);
    }
  });

  test("defaults helper receivers to the holder and preserves explicit receivers", () => {
    const input = {
      [callable](this: unknown) {
        return this;
      },
    };

    for (const receiver of [undefined, call]) {
      expect(call.call(receiver, input)).toBe(input);
    }

    for (const receiver of [null, false, 0, {}, input[callable], input]) {
      expect(call.call(receiver, input)).toBe(receiver);
    }

    const holder = { invoke: call };

    expect(holder.invoke(input)).toBe(holder);

    const detached = holder.invoke;

    expect(detached(input)).toBe(input);
  });

  test("normalizes helper receivers for ordinary functions", () => {
    function fn(this: unknown) {
      return this;
    }

    expect(call(fn)).toBeUndefined();

    expect(call.call(call, fn)).toBeUndefined();

    expect(call.call(apply, fn)).toBe(apply);

    expect(call.call(null, fn)).toBeNull();
  });
});
