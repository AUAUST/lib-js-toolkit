import { resolveCallable } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, test } from "vitest";

describe("resolveCallable()", () => {
  test("returns a function as is", () => {
    const fn = () => {};

    expect(resolveCallable(fn)).toBeTypeOf("function");
    expect(resolveCallable(fn)).toBe(fn);
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

    // @ts-expect-error
    const resolved = resolveCallable(obj, { value: "wrong" });

    expect(resolved()).toBe("wrong");
  });
});
