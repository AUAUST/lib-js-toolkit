import { apply, call } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("apply()", () => {
  test("invokes functions with an argument tuple", () => {
    expect(apply(() => 42, [])).toBe(42);

    const add = (a: number, b: number) => a + b;

    const result = apply(add, [1, 2]);

    expect(result).toBe(3);

    expectTypeOf(result).toEqualTypeOf<number>();
  });

  test("supports the protocol and preserves signatures through native methods", () => {
    const input = {
      prefix: "hello",
      [callable](name: string, times: number) {
        return `${this.prefix} ${name}`.repeat(times);
      },
    };

    expect(apply(input, ["world", 1])).toBe("hello world");

    const context = { prefix: "goodbye" };

    const result = apply.call(context, input, ["world", 1]);

    expect(result).toBe("goodbye world");

    expectTypeOf(result).toEqualTypeOf<string>();

    expectTypeOf(
      apply.apply(context, [input, ["world", 1]]),
    ).toEqualTypeOf<string>();

    expectTypeOf(
      apply.call(null, (n: number) => n, [1]),
    ).toEqualTypeOf<number>();

    if (false) {
      // @ts-expect-error Missing required argument.
      apply(input, ["world"]);
      // @ts-expect-error Incorrect argument type.
      apply.call(context, input, [1, "world"]);
      // @ts-expect-error Incorrect tuple through native apply.
      apply.apply(context, [input, ["world"]]);
    }
  });

  test("defaults helper receivers to the holder and preserves explicit receivers", () => {
    const input = {
      [callable](this: unknown) {
        return this;
      },
    };

    for (const receiver of [undefined, apply]) {
      expect(apply.call(receiver, input, [])).toBe(input);
    }

    for (const receiver of [null, false, 0, {}, input[callable], input]) {
      expect(apply.call(receiver, input, [])).toBe(receiver);
    }

    const holder = { invoke: apply };

    expect(holder.invoke(input, [])).toBe(holder);

    const detached = holder.invoke;

    expect(detached(input, [])).toBe(input);
  });

  test("forwards receivers to ordinary functions", () => {
    function fn(this: unknown) {
      return this;
    }

    const context = { value: 42 };

    expect(apply.call(context, fn, [])).toBe(context);

    expect(apply(fn, [])).toBeUndefined();

    expect(apply.call(call, fn, [])).toBe(call);

    expect(apply.call(apply, fn, [])).toBeUndefined();

    expect(apply.call(null, fn, [])).toBeNull();
  });

  test("prefers the protocol when a function implements it", () => {
    const input = Object.assign(() => 42, {
      [callable](value: string) {
        return value;
      },
    });

    expectTypeOf(apply(input, ["protocol"])).toEqualTypeOf<string>();

    expect(apply(input, ["protocol"])).toBe("protocol");

    expectTypeOf(call.call(null, input, "protocol")).toEqualTypeOf<string>();
  });

  test("rejects non-callable inputs", () => {
    // @ts-expect-error Non-callable input.
    expect(() => apply(42, [])).toThrow(TypeError);
  });
});
