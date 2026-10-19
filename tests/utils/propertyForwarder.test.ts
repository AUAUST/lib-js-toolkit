import { propertyForwarder } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("propertyForwarder()", () => {
  test("mirrors descriptor flags from the handler", () => {
    const handler = {} as {
      readonly locked: number;
      mutable: number;
      getter: number;
      writable: number;
    };

    Object.defineProperties(handler, {
      locked: {
        value: 1,
        enumerable: false,
        configurable: false,
      },
      mutable: {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true,
      },
      getter: {
        get() {
          return 3;
        },
        enumerable: true,
        configurable: true,
      },
      writable: {
        get() {
          return 4;
        },
        set(value: number) {},
        enumerable: false,
        configurable: true,
      },
    });

    const locked = propertyForwarder(handler, "locked");

    const mutable = propertyForwarder(handler, { property: "mutable" });

    const getter = propertyForwarder(handler, { property: "getter" });

    const writable = propertyForwarder(handler, "writable");

    expect(locked.enumerable).toBe(false);
    expect(locked.configurable).toBe(false);
    expect(locked.set).toBeUndefined();

    expect(mutable.enumerable).toBe(true);
    expect(mutable.configurable).toBe(true);
    expect(mutable.set).toBeTypeOf("function");

    expect(getter.enumerable).toBe(true);
    expect(getter.configurable).toBe(true);
    expect(getter.set).toBeUndefined();

    expect(writable.enumerable).toBe(false);
    expect(writable.configurable).toBe(true);
    expect(writable.set).toBeTypeOf("function");
  });

  test("allows descriptor flags to be overridden", () => {
    const handler = { value: 1 };

    const forwarder = propertyForwarder(handler, {
      property: "value",
      enumerable: false,
      configurable: false,
      readonly: true,
    });

    expect(forwarder.enumerable).toBe(false);
    expect(forwarder.configurable).toBe(false);
    expect(forwarder.set).toBeUndefined();
  });

  test("respects readonly source properties even when overridden", () => {
    const handler = {
      get getter() {
        return 1;
      },
    } as {
      getter: number;
      readonly: boolean;
    };

    Object.defineProperty(handler, "readonly", {
      value: true,
      writable: false,
    });

    const getter = propertyForwarder(handler, "getter", {
      readonly: false,
    });

    const readonly = propertyForwarder(handler, "readonly", {
      readonly: false,
    });

    expect(getter.set).toBeUndefined();
    expect(readonly.set).toBeUndefined();
  });

  test("creates a writable default for missing properties", () => {
    const handler = {} as { later: string };

    const forwarder = propertyForwarder(handler, "later");

    expect(forwarder.enumerable).toBe(true);
    expect(forwarder.configurable).toBe(true);
    expect(forwarder.set).toBeTypeOf("function");
    expect(forwarder.get).toBeTypeOf("function");
  });

  test("supports symbol properties", () => {
    const property = Symbol("value");

    const handler = { [property]: 1 };

    const forwarder = propertyForwarder(handler, property);

    expect(forwarder.get).toBeTypeOf("function");
    expect(forwarder.set).toBeTypeOf("function");
  });

  test("correctly gets values", () => {
    const handler = { value: 42 } as { value?: number };

    const forwarder = propertyForwarder(handler, "value");

    expect(forwarder.get()).toBe(42);

    handler.value = 100;

    expect(forwarder.get()).toBe(100);

    delete handler.value;

    expect(forwarder.get()).toBeUndefined();
  });

  test("correctly sets values", () => {
    const handler = { value: 42 } as { value?: number };

    const forwarder = propertyForwarder(handler, "value");

    forwarder.set?.(100);

    expect(handler.value).toBe(100);
  });

  test("supports initializing values", () => {
    const handler = {} as { value?: number };

    const forwarder = propertyForwarder(handler, "value");

    expect(forwarder.get()).toBeUndefined();
    expect(handler.value).toBeUndefined();

    forwarder.set?.(42);

    expect(handler.value).toBe(42);
    expect(forwarder.get()).toBe(42);
  });
});
