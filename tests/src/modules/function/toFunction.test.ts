import { describe, expect, expectTypeOf, test } from "vitest";

import { toFunction } from "@auaust/toolkit/function";
import { callable } from "@auaust/toolkit/protocol";

describe("toFunction", () => {
  test("returns a function as is", () => {
    const fn = (a: string, b: number): a is `${typeof b}` => {
      return String(b) === a;
    };

    const resolved = toFunction(fn);

    expect(resolved).toBeTypeOf("function");
    expect(resolved).toBe(fn);
    expect(toFunction(fn)).toBe(fn);
    expectTypeOf(toFunction(fn)).toEqualTypeOf<typeof fn>();

    expectTypeOf(toFunction(fn)).toEqualTypeOf<
      (a: string, b: number) => a is `${typeof b}`
    >();
  });

  test("extracts and binds a callable object", () => {
    const object = {
      [callable]() {
        return this.getValue();
      },
      value: 42,
      getValue() {
        return this.value;
      },
    };

    const resolved = toFunction(object);

    expect(resolved()).toBe(42);
  });

  test("supports binding a thisArg", () => {
    const object = {
      [callable](this: { value: number }) {
        return this.value;
      },
      value: 42,
    };

    function fn(this: { value: number }) {
      return this.value;
    }

    const unboundObject = toFunction(object);

    expectTypeOf<
      ThisParameterType<typeof unboundObject>
    >().toEqualTypeOf<unknown>();

    expect(unboundObject()).toBe(42);
    expectTypeOf(unboundObject()).toBeNumber();

    const unboundFn = toFunction(fn);

    expectTypeOf<ThisParameterType<typeof unboundFn>>().toEqualTypeOf<{
      value: number;
    }>();

    // @ts-expect-error Missing this context
    expect(() => unboundFn()).toThrow();

    expect(
      unboundFn.call({
        value: 30,
      }),
    ).toBe(30);

    const boundObject = toFunction(object, {
      value: 100,
    });

    expectTypeOf<
      ThisParameterType<typeof boundObject>
    >().toEqualTypeOf<unknown>();

    expect(boundObject()).toBe(100);
    expectTypeOf(boundObject()).toBeNumber();

    const boundFun = toFunction(fn, {
      value: 100,
    });

    expectTypeOf<ThisParameterType<typeof boundFun>>().toEqualTypeOf<unknown>();
    expectTypeOf(boundFun()).toBeNumber();
    expect(boundFun()).toBe(100);

    expect(
      boundFun.call({
        value: 2,
      }),
    ).toBe(100); // Function is bound to 100
  });

  test("throws a TypeError on a non-callable value", () => {
    // @ts-expect-error Not callable
    expect(() => toFunction({})).toThrow(TypeError);
  });
});
