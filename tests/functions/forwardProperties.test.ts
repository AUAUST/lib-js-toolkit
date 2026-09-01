import { forwardProperties } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("forwardProperties()", () => {
  test("reads and writes through the handler", () => {
    const handler = { value: 1 };

    const forwarded = forwardProperties({}, handler, ["value"] as const);

    expect(forwarded.value).toBe(1);

    forwarded.value = 2;

    expect(handler.value).toBe(2);

    handler.value = 3;

    expect(forwarded.value).toBe(3);
  });

  test("uses the handler as the getter and setter receiver", () => {
    const handler = {
      multiplier: 10,
      _value: 1,
      get value() {
        return this.multiplier * this._value;
      },
      set value(value: number) {
        this._value = value;
      },
    };

    const forwarded = forwardProperties({}, handler, ["value"] as const);

    expect(forwarded.value).toBe(10);

    forwarded.value = 2;

    expect(handler._value).toBe(2);
  });

  test("mirrors descriptor flags from the handler", () => {
    const handler = {} as { readonly locked: number; mutable: number };

    Object.defineProperties(handler, {
      locked: { value: 1, enumerable: false, configurable: false },
      mutable: {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true,
      },
    });

    const forwarded = forwardProperties({}, handler, [
      "locked",
      "mutable",
    ] as const);

    const locked = Object.getOwnPropertyDescriptor(forwarded, "locked")!;

    const mutable = Object.getOwnPropertyDescriptor(forwarded, "mutable")!;

    expect(locked.enumerable).toBe(false);
    expect(locked.configurable).toBe(false);
    expect(locked.set).toBeUndefined();
    expect(mutable.enumerable).toBe(true);
    expect(mutable.configurable).toBe(true);
    expect(mutable.set).toBeTypeOf("function");
  });

  test("allows descriptor flags to be overridden", () => {
    const handler = { value: 1 };

    const forwarded = forwardProperties({}, handler, [
      {
        property: "value",
        readonly: true,
        enumerable: false,
        configurable: false,
      },
    ] as const);

    const descriptor = Object.getOwnPropertyDescriptor(forwarded, "value")!;

    expect(descriptor.enumerable).toBe(false);
    expect(descriptor.configurable).toBe(false);
    expect(descriptor.set).toBeUndefined();
  });

  test("uses JavaScript descriptor defaults for missing handler properties", () => {
    const handler = {} as { later: string };

    const forwarded = forwardProperties({}, handler, ["later"] as const);

    const descriptor = Object.getOwnPropertyDescriptor(forwarded, "later")!;

    expect(descriptor.enumerable).toBe(false);
    expect(descriptor.configurable).toBe(false);
    expect(descriptor.set).toBeUndefined();
    expect(forwarded.later).toBeUndefined();
  });

  test("supports symbol properties and rejects target collisions", () => {
    const property = Symbol("value");

    const handler = { [property]: 1 };

    const forwarded = forwardProperties({}, handler, [property] as const);

    expect(forwarded[property]).toBe(1);
    expect(() =>
      forwardProperties({ [property]: 0 }, handler, [property] as const),
    ).toThrow(
      `Target object already has a property named ${String(
        property,
      )}. Cannot forward property.`,
    );
  });
});
