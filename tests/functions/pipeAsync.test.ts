import { pipeAsync, PipelineError } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("pipeAsync()", () => {
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
      [false, async (x: number) => x * 2]
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
      [(x: number) => !isEven(x), async (x: number) => x - 100]
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
      expect(error.functionThatFailed).toBe(throwError);
    });
  });
});
