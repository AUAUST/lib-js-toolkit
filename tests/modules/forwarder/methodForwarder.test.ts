import { methodForwarder } from "@auaust/toolkit/forwarder";
import { defineProperty } from "@auaust/toolkit/object";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("methodForwarder", () => {
  test("preserves method signatures, receivers, and wrapper identity", () => {
    const source = {
      value: 42,
      method(suffix = "") {
        return `${this.value}${suffix}`;
      },
    };

    const descriptor = methodForwarder(source, "method");
    const api = defineProperty({}, "method", descriptor);

    expect(descriptor.get).toBeTypeOf("function");
    expect(api.method()).toBe("42");
    expect(api.method("!")).toBe("42!");
    expect(
      api.method.call(
        {
          value: 7,
        },
        "?",
      ),
    ).toBe("7?");
    expect(api.method).toBe(api.method);
    expect(api.method).not.toBe(source.method);
    expectTypeOf(descriptor.get()).toEqualTypeOf<typeof source.method>();
  });
});
