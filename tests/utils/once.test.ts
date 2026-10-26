import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { once } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";

import { createValues } from "../fixtures/values";

describe("once", () => {
  test.for(createValues())(
    "caches %s until reset and exposes its state",
    (value) => {
      const callback = vi.fn(() => value);
      const fn = once(callback);

      expect(fn.called).toBe(false);
      expect(fn.value).toBeUndefined();
      expect(callback).not.toHaveBeenCalled();
      expect(fn()).toBe(value);
      expect(fn()).toBe(value);
      expect(fn.called).toBe(true);
      expect(fn.value).toBe(value);
      expect(callback).toHaveBeenCalledOnce();
      expectTypeOf(fn()).toEqualTypeOf<typeof value>();

      if (fn.called) {
        expectTypeOf(fn.value).toEqualTypeOf<typeof value>();
      }

      fn.reset();

      expect(fn.called).toBe(false);
      expect(fn.value).toBeUndefined();
      expect(fn()).toBe(value);
      expect(callback).toHaveBeenCalledTimes(2);
    },
  );

  test("retains the callable method and binds the factory receiver", () => {
    const callback = {
      factor: 2,
      [callable]() {
        return this.factor;
      },
    };

    const wrapped = once(callback);

    const context = {
      factor: 3,
    };

    const bound = once.call(context, callback);

    callback[callable] = () => 99;

    expect(wrapped()).toBe(2);
    expect(bound()).toBe(3);

    context.factor = 5;

    expect(bound()).toBe(3);

    bound.reset();

    wrapped.reset();

    expect(bound()).toBe(5);
    expect(wrapped()).toBe(2);
  });

  test("binds ordinary functions to the factory receiver", () => {
    const context = {
      factor: 3,
    };

    function callback(this: typeof context) {
      return this.factor * 10;
    }

    const fn = once.call(context, callback);

    expect(fn()).toBe(30);

    context.factor = 5;

    expect(fn()).toBe(30);

    fn.reset();

    expect(fn()).toBe(50);
  });
});
