import { describe, expect, expectTypeOf, test } from "vitest";

import { pipeAsync } from "@auaust/toolkit";
import { PipelineError } from "@auaust/toolkit/errors";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("pipeAsync", () => {
  test("composes functions from left to right", async () => {
    const add = async (x: number) => x + 2;
    const multiply = async (x: number) => x * 3;
    const subtract = async (x: number) => x - 5;
    const pipedFunction = pipeAsync(add, multiply, subtract);

    return pipedFunction(4).then((result) => {
      // ((4 + 2) * 3) - 5 = 13
      expect(result).toBe(13);
    });
  });

  test("maintains the context of 'this' when using methods", async () => {
    const obj = {
      factor: 2,
      async add(this: { factor: number }, x: number) {
        return x + this.factor;
      },
      async multiply(this: { factor: number }, x: number) {
        return x * this.factor;
      },
    };

    const pipedFunction = pipeAsync(obj.add, obj.multiply);

    return pipedFunction.call(obj, 3).then((result) => {
      // (3 + 2) * 2 = 10
      expect(result).toBe(10);
    });
  });

  test("can conditionally apply functions", async () => {
    const pipedFunction = pipeAsync(
      [true, async (x: number) => x + 10],
      [false, async (x: number) => x * 2],
    );

    return pipedFunction(5).then((result) => {
      // 5 + 10 = 15
      expect(result).toBe(15);
    });
  });

  test("works with synchronous functions in the pipeline", async () => {
    const add = (x: number) => x + 2;
    const multiply = async (x: number) => x * 3;
    const subtract = (x: number) => x - 5;
    const pipedFunction = pipeAsync(add, multiply, subtract);

    return pipedFunction(4).then((result) => {
      // ((4 + 2) * 3) - 5 = 13
      expect(result).toBe(13);
    });
  });

  test("works with functional conditions", async () => {
    const isEven = (x: number) => x % 2 === 0;

    const pipedFunction = pipeAsync(
      [isEven, async (x: number) => x + 100],
      [(x: number) => !isEven(x), async (x: number) => x - 100],
    );

    return pipedFunction(4).then((result) => {
      // 4 is even, so 4 + 100 = 104
      expect(result).toBe(104);
    });
  });

  test("handles errors in the pipeline", async () => {
    const add = async (x: number) => x + 2;

    const throwError = async (x: number) => {
      throw new Error("Test error");
    };

    const multiply = async (x: number) => x * 3;
    const pipedFunction = pipeAsync(add, throwError, multiply);

    return pipedFunction(4).catch((error) => {
      expect(error).toBeInstanceOf(PipelineError);
      expect(error.message).toContain("Test error");
      expect(error.fn).toBe(throwError);
      expect(error.input).toBe(6);
    });
  });

  test("resolves callable steps and conditions once", async () => {
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

    const wrapped = pipeAsync([condition, callback], (value) => `${value}!`);

    callback[callable] = () => 99;

    condition[callable] = () => false;

    const result = await wrapped(4);

    expectTypeOf(result).toEqualTypeOf<string>();
    expect(result).toBe("8!");
    expect(await wrapped(2)).toBe("2!");
  });

  test("reports the original callable step in pipeline errors", async () => {
    const cause = new Error("failure");

    const callback = {
      [callable](_value: number): number {
        throw cause;
      },
    };

    const wrapped = pipeAsync(callback);

    try {
      await wrapped(4);
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

  test("awaits callable steps and forwards an explicit receiver", async () => {
    const context = {
      factor: 3,
    };

    const wrapped = pipeAsync(
      {
        async [callable](this: typeof context, value: number) {
          return this.factor * value;
        },
      },
      (value) => `${value}!`,
    );

    const result = await wrapped.call(context, 4);

    expectTypeOf(result).toEqualTypeOf<string>();
    expect(result).toBe("12!");
  });
});
