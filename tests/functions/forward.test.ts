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
      forward.property(a, forward.as("aValue", "valueFromA")),
      forward.properties(a, "aOtherValue"),
      forward.method(a, "aMethod"),
      forward.methods(a, "aOtherMethod"),
      forward.properties(b, ["bValue", "bOtherValue"]),
      forward.methods(b, ["bMethod", "bOtherMethod"]),
      forward.properties(c, "cValue", "cOtherValue"),
      forward.methods(
        c,
        "cMethod",
        forward.as("cOtherMethod", "myAliasedCOtherMethod"),
      ),
    );

    expect(api.method()).toEqual(
      expect.arrayContaining([
        "value",
        "method",
        "valueFromA",
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
        "myAliasedCOtherMethod",
      ]),
    );

    expect(api.valueFromA).toBe(a.aValue);
    // @ts-expect-error
    expect(api.aValue).toBeUndefined();
    expect(api.aOtherMethod()).toBe(a.aOtherValue);
    expect(api.bMethod()).toBe(b.bValue);
    expect(api.bOtherMethod()).toBe(b.bOtherValue);
    expect(api.cMethod()).toBe(c.cValue);
    expect(api.myAliasedCOtherMethod()).toBe(c.cOtherValue);
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

  test("forwards properties and methods under aliases", () => {
    const source = {
      value: 42,
      greet(name: string) {
        return `${this.value} times hello, ${name}!`;
      },
    };

    const api = forward(
      {},
      forward.property(source, forward.as("value", "answer")),
      forward.method(source, forward.as("greet", "hello")),
    );

    expect(api.answer).toBe(42);
    expect(api.hello("World")).toBe("42 times hello, World!");

    api.answer = 7;

    expect(source.value).toBe(7);
    expectTypeOf(api).toEqualTypeOf<{
      answer: number;
      hello: typeof source.greet;
    }>();
  });

  test("accepts forwarding options after a forward.as() input", () => {
    const source = {
      value: 42,
      method() {
        return this.value;
      },
      get getter() {
        return this.value * 2;
      },
    };

    const api = forward(
      {},
      forward.property(source, "value", {
        as: "answer",
        readonly: true,
        enumerable: false,
      }),
      forward.method(source, forward.as("method", "read"), {
        enumerable: true,
      }),
      forward.property(source, "getter", { as: "doubleValue" }),
    );

    expect(Object.keys(api)).toEqual(["read", "doubleValue"]);
    expect(api.read()).toBe(42);
    expectTypeOf(api).toEqualTypeOf<{
      readonly answer: number;
      read: typeof source.method;
      doubleValue: number;
    }>();
  });

  test("supports aliased option entries in plural helpers", () => {
    const source = {
      value: 42,
      method() {
        return this.value;
      },
    };

    const api = forward(
      {},
      forward.properties(source, {
        property: "value",
        as: "answer",
        readonly: true,
      }),
      forward.methods(source, {
        method: "method",
        as: "read",
        enumerable: true,
      }),
    );

    expect(api.answer).toBe(42);
    expect(api.read()).toBe(42);
    expectTypeOf(api).toEqualTypeOf<{
      readonly answer: number;
      read: typeof source.method;
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
