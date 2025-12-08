import { pipe } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("pipe()", () => {
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
      [false, (x: number) => x * 2]
    );

    const result = pipedFunction(5); // 5 + 10 = 15

    expect(result).toBe(15);

    const pipedFunction2 = pipe(
      [false, (x: number) => x + 10],
      [true, (x: number) => x * 2]
    );

    const result2 = pipedFunction2(5); // 5 * 2 = 10

    expect(result2).toBe(10);
  });

  test("works with functional conditions", () => {
    const isEven = (x: number) => x % 2 === 0;

    const pipedFunction = pipe(
      [isEven, (x: number) => x + 100],
      [(x: number) => !isEven(x), (x: number) => x - 100]
    );

    const result1 = pipedFunction(4); // 4 is even, so 4 + 100 = 104
    const result2 = pipedFunction(5); // 5 is odd, so 5 - 100 = -95

    expect(result1).toBe(104);
    expect(result2).toBe(-95);
  });
});
