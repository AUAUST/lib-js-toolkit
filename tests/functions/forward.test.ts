import {
  forward,
  methodForwarder,
  methodForwarders,
  propertyForwarder,
  propertyForwarders,
} from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("forward()", () => {
  test("exposes the forwarding API as methods", () => {
    expect(forward.properties).toBe(propertyForwarders);
    expect(forward.property).toBe(propertyForwarder);
    expect(forward.methods).toBe(methodForwarders);
    expect(forward.method).toBe(methodForwarder);
  });

  test("forwards single calls", () => {
    const handler = {
      value: 42,
      greet(name: string) {
        return `${this.value} times hello, ${name}!`;
      },
    };

    const target = {};

    const forwarded = forward(
      target,
      forward.method(handler, "greet"),
      forward.property(handler, "value"),
    );

    expect(target).toBe(forwarded);

    const result = forwarded.greet("World");

    expect(result).toBe("42 times hello, World!");

    forwarded.value = 100;

    expect(handler.value).toBe(100);

    expect(forwarded.greet.call({ value: 200 }, "World")).toBe(
      "200 times hello, World!",
    );
  });

  test("forwards multiple sources at once", () => {
    const a = {
      aValue: 1,
      aOtherValue: 2,
      aMethod() {
        return this.aValue;
      },
      aOtherMethod() {
        return this.aOtherValue;
      },
    };

    const b = {
      bValue: 3,
      bOtherValue: 4,
      bMethod() {
        return this.bValue;
      },
      bOtherMethod() {
        return this.bOtherValue;
      },
    };

    const c = {
      cValue: 5,
      cOtherValue: 6,
      cMethod() {
        return this.cValue;
      },
      cOtherMethod() {
        return this.cOtherValue;
      },
    };

    const api = forward(
      {
        value: 6,
        method() {
          return Object.keys(this);
        },
      },
      forward.property(a, "aValue"),
      forward.properties(a, "aOtherValue"),
      forward.method(a, "aMethod"),
      forward.methods(a, "aOtherMethod"),
      forward.properties(b, ["bValue", "bOtherValue"]),
      forward.methods(b, ["bMethod", "bOtherMethod"]),
      forward.properties(c, "cValue", "cOtherValue"),
      forward.methods(c, "cMethod", "cOtherMethod"),
    );

    expect(api.method()).toEqual(
      expect.arrayContaining([
        "value",
        "method",
        "aValue",
        "aOtherValue",
        "aMethod",
        "aOtherMethod",
        "bValue",
        "bOtherValue",
        "bMethod",
        "bOtherMethod",
        "cValue",
        "cOtherValue",
        "cMethod",
        "cOtherMethod",
      ]),
    );

    expect(api.aMethod()).toBe(a.aValue);
    expect(api.aOtherMethod()).toBe(a.aOtherValue);
    expect(api.bMethod()).toBe(b.bValue);
    expect(api.bOtherMethod()).toBe(b.bOtherValue);
    expect(api.cMethod()).toBe(c.cValue);
    expect(api.cOtherMethod()).toBe(c.cOtherValue);
  });

  test("merges the types of every forwarding entry", () => {
    const source = {
      mutable: 1,
      immutable: "value",
      method(value: boolean) {
        return Number(value);
      },
    };

    const api = forward(
      { own: true },
      forward.properties(source, [
        "mutable",
        { property: "immutable", readonly: true },
      ]),
      forward.method(source, "method"),
    );

    expectTypeOf(api).toEqualTypeOf<{
      own: boolean;
      mutable: number;
      readonly immutable: string;
      method: typeof source.method;
    }>();
  });

  test("throws when target already has the property", () => {
    const handler = {
      value: 42,
    };

    const target = {
      value: 100,
    };

    expect(() => {
      forward(target, forward.property(handler, "value"));
    }).toThrow("Existing property value cannot be forwarded on target.");
  });
});
