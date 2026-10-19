import { resolveCallable } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("resolveCallable()", () => {
  test("returns a function as is", () => {
    const fn = (a: string, b: number): a is `${typeof b}` => {
      return String(b) === a;
    };

    const resolved = resolveCallable(fn);

    expect(resolved).toBeTypeOf("function");

    expect(resolved).toBe(fn);

    expect(resolveCallable(fn)).toBe(fn);

    expectTypeOf(resolveCallable(fn)).toEqualTypeOf<typeof fn>();

    expectTypeOf(resolveCallable(fn)).toEqualTypeOf<
      (a: string, b: number) => a is `${typeof b}`
    >();
  });

  test("extracts and binds a callable object", () => {
    const obj = {
      [callable]() {
        return this.getValue();
      },
      value: 42,
      getValue() {
        return this.value;
      },
    };

    const resolved = resolveCallable(obj);

    expect(resolved()).toBe(42);
  });

  test("supports binding a thisArg", () => {
    const obj = {
      [callable](this: { value: number }) {
        return this.value;
      },
      value: 42,
    };

    const fun = function (this: { value: number }) {
      return this.value;
    };

    const unboundObj = resolveCallable(obj);

    expectTypeOf<
      ThisParameterType<typeof unboundObj>
    >().toEqualTypeOf<unknown>();

    expect(unboundObj()).toBe(42);

    expectTypeOf(unboundObj()).toBeNumber();

    const unboundFun = resolveCallable(fun);

    expectTypeOf<ThisParameterType<typeof unboundFun>>().toEqualTypeOf<{
      value: number;
    }>();

    // @ts-expect-error Missing this context
    expect(() => unboundFun()).toThrow();

    expect(unboundFun.call({ value: 30 })).toBe(30);

    const boundObj = resolveCallable(obj, { value: 100 });

    expectTypeOf<ThisParameterType<typeof boundObj>>().toEqualTypeOf<unknown>();

    expect(boundObj()).toBe(100);

    expectTypeOf(boundObj()).toBeNumber();

    const boundFun = resolveCallable(fun, { value: 100 });

    expectTypeOf<ThisParameterType<typeof boundFun>>().toEqualTypeOf<unknown>();

    expectTypeOf(boundFun()).toBeNumber();

    expect(boundFun()).toBe(100);

    expect(boundFun.call({ value: 2 })).toBe(100); // Function is bound to 100
  });
});
