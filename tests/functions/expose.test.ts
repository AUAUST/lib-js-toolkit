import { expose } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("expose()", () => {
  test("conditionally exposes a value on a target", () => {
    expose("testValueA", 42);

    // @ts-expect-error
    expect(globalThis.testValueA).toBe(42);
  });

  test("does not expose a value when the condition is false", () => {
    expose("testValueB", 42, false);

    // @ts-expect-error
    expect(globalThis.testValueB).toBeUndefined();
  });

  test("exposes multiple values from an object", () => {
    expose({ testValue1: 1, testValue2: 2 });

    // @ts-expect-error
    expect(globalThis.testValue1).toBe(1);
    // @ts-expect-error
    expect(globalThis.testValue2).toBe(2);
  });

  test("sets properties on a custom target", () => {
    const customTarget: Record<PropertyKey, any> = {};

    expose("foo", 123, true, customTarget);

    expect(customTarget.foo).toBe(123);
    // @ts-expect-error
    expect(globalThis.foo).toBeUndefined();
  });

  test("sets the default target for subsequent exposures", () => {
    const defaultTarget: Record<PropertyKey, any> = {};

    expose.target(defaultTarget);
    expose("bar", 456);

    expect(defaultTarget.bar).toBe(456);
    // @ts-expect-error
    expect(globalThis.bar).toBeUndefined();
  });
});
