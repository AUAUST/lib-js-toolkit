import { forwardCalls } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("forwardCalls()", () => {
  test("calls methods on the handler object when invoked on the target object", () => {
    const handler = {
      value: 42,
      greet(name: string) {
        return `${this.value} times hello, ${name}!`;
      },
    };

    const target = {};

    const forwarded = forwardCalls(target, handler, "greet");

    const result = forwarded.greet("World");

    expect(result).toBe("42 times hello, World!");
  });

  test("forwards multiple methods", () => {
    const handler = {
      add(a: number, b: number) {
        return a + b;
      },
      multiply(a: number, b: number) {
        return a * b;
      },
    };

    const target = {};

    const forwarded = forwardCalls(target, handler, ["add", "multiply"]);

    const sum = forwarded.add(2, 3);
    const product = forwarded.multiply(4, 5);

    expect(sum).toBe(5);
    expect(product).toBe(20);
  });

  test("preserves the handler's context", () => {
    const handler = {
      factor: 10,
      scale(value: number) {
        return value * this.factor;
      },
    };

    const target = {};

    const forwarded = forwardCalls(target, handler, "scale");

    const result = forwarded.scale(5);

    expect(result).toBe(50);
  });

  test("throws an error if the target already has the method", () => {
    const handler = {
      greet(name: string) {
        return `Hello, ${name}!`;
      },
    };

    const target = {
      greet() {
        return "This is the target's greet method.";
      },
    };

    expect(() => {
      forwardCalls(target, handler, "greet");
    }).toThrowError(
      "Target object already has a property named greet. Cannot forward call."
    );
  });

  test("throws an error if the method does not exist on the handler", () => {
    const handler = {
      farewell(name: string) {
        return `Goodbye, ${name}!`;
      },
    };

    const target = {};

    expect(() => {
      forwardCalls(target, handler, "greet" as any);
    }).toThrowError("Method greet does not exist on the provided interface.");
  });

  test("handles symbol-named methods", () => {
    const sym = Symbol("uniqueMethod");

    const handler = {
      [sym](msg: string) {
        return `Message: ${msg}`;
      },
    };

    const target = {};

    const forwardedOne = forwardCalls(target, handler, sym);
    const forwardedMany = forwardCalls(target, handler, [sym]);

    const resultOne = forwardedOne[sym]("Hello Symbol");
    const resultMany = forwardedMany[sym]("Hello Symbol");

    expect(resultOne).toBe("Message: Hello Symbol");
    expect(resultMany).toBe("Message: Hello Symbol");
  });
});
