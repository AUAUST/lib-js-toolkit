import { describe, expect, expectTypeOf, test } from "vitest";
import { methodForwarder } from "~/functions/methodForwarder";

describe("methodForwarder()", () => {
  test("forwards ordinary calls to the source", () => {
    const source = {
      value: 42,
      method() {
        return this.value;
      },
    };

    const descriptor = methodForwarder(source, "method");

    expect(descriptor).toHaveProperty("get");
    expect(descriptor.get()).toBeTypeOf("function");

    const api = Object.defineProperty({}, "method", descriptor) as {
      method: typeof source.method;
    };

    expect(api.method()).toBe(42);
  });

  test("preserves an explicitly supplied receiver", () => {
    const source = {
      value: 42,
      method() {
        return this.value;
      },
    };

    const api = Object.defineProperty(
      {},
      "method",
      methodForwarder(source, "method"),
    ) as {
      method: typeof source.method;
    };

    expect(api.method.call({ value: 7 })).toBe(7);
  });

  test("returns the same function for repeated access", () => {
    const source = {
      method() {},
    };

    const api = Object.defineProperty(
      {},
      "method",
      methodForwarder(source, "method"),
    ) as { method: typeof source.method };

    expect(api.method).toBe(api.method);
    expect(api.method).not.toBe(undefined);
    expect(api.method).not.toBe(source.method);
  });

  test("preserves the method type", () => {
    const source = {
      method(value: string) {
        return value.length;
      },
    };

    const descriptor = methodForwarder(source, "method");

    expectTypeOf(descriptor.get()).toEqualTypeOf<typeof source.method>();
  });
});
