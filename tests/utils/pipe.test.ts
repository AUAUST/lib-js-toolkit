import { describe, expect, expectTypeOf, test } from "vitest";

import { pipe } from "@auaust/toolkit";
import { PipelineError } from "@auaust/toolkit/errors";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("pipe", () => {
  test("composes functions from left to right", () => {
    const add = (x: number) => x + 2;
    const multiply = (x: number) => x * 3;
    const subtract = (x: number) => x - 5;
    const pipedFunction = pipe(add, multiply, subtract);
    const result = pipedFunction(4); // ((4 + 2) * 3) - 5 = 13

    expect(result).toBe(13);
  });

  test("maintains the context of 'this' when using methods", () => {
    const obj = {
      factor: 2,
      add(this: { factor: number }, x: number) {
        return x + this.factor;
      },
      multiply(this: { factor: number }, x: number) {
        return x * this.factor;
      },
    };

    const pipedFunction = pipe(obj.add, obj.multiply);
    const result = pipedFunction.call(obj, 3); // (3 + 2) * 2 = 10

    expect(result).toBe(10);
  });

  test("can conditionally apply functions", () => {
    const pipedFunction = pipe(
      [true, (x: number) => x + 10],
      [false, (x: number) => x * 2],
    );

    const result = pipedFunction(5); // 5 + 10 = 15

    expect(result).toBe(15);

    const pipedFunction2 = pipe(
      [false, (x: number) => x + 10],
      [true, (x: number) => x * 2],
    );

    const result2 = pipedFunction2(5); // 5 * 2 = 10

    expect(result2).toBe(10);
  });

  test("works with functional conditions", () => {
    const isEven = (x: number) => x % 2 === 0;

    const pipedFunction = pipe(
      [isEven, (x: number) => x + 100],
      [(x: number) => !isEven(x), (x: number) => x - 100],
    );

    const result1 = pipedFunction(4); // 4 is even, so 4 + 100 = 104
    const result2 = pipedFunction(5); // 5 is odd, so 5 - 100 = -95

    expect(result1).toBe(104);
    expect(result2).toBe(-95);
  });

  test("throws a PipelineError with useful information on failure", () => {
    const fn1 = (x: number) => x + 1;

    const fn2 = (x: number) => {
      throw new Error("Intentional failure");
    };

    const fn3 = (x: number) => x * 2;
    const pipedFunction = pipe(fn1, fn2, fn3);

    try {
      pipedFunction(5);
    } catch (error: any) {
      expect(error).toBeInstanceOf(PipelineError);
      expect(error.name).toBe("PipelineError");
      expect(error.message).toMatch(/Pipeline step failed/);
      expect(error.message).toMatch(/Intentional failure/);
      expect(error.step).toBe(1); // 0 indexed
      expect(error.input).toBe(6);
      expect(error.fn).toBe(fn2);
      expect(error.cause.message).toBe("Intentional failure");
    }
  });

  test("resolves callable steps and conditions once", () => {
    const callback = {
      factor: 2,
      [callable](value: number) {
        return value * this.factor;
      },
    };

    const condition = {
      minimum: 3,
      [callable](value: number) {
        return value >= this.minimum;
      },
    };

    const wrapped = pipe([condition, callback], (value) => `${value}!`);

    callback[callable] = () => 99;

    condition[callable] = () => false;

    const result = wrapped(4);

    expectTypeOf(result).toEqualTypeOf<string>();
    expect(result).toBe("8!");
    expect(wrapped(2)).toBe("2!");
  });

  test("reports the original callable step in pipeline errors", () => {
    const cause = new Error("failure");

    const callback = {
      [callable](_value: number): number {
        throw cause;
      },
    };

    const wrapped = pipe(callback);

    try {
      wrapped(4);
      throw new Error("Expected a pipeline failure");
    } catch (error) {
      expect(error).toBeInstanceOf(PipelineError);
      expect(error).toMatchObject({
        fn: callback,
        cause,
        step: 0,
        input: 4,
      });
    }
  });
});
