import { empty, value as resolve } from "@auaust/toolkit";
import {
  type DefineProtocol,
  implementsProtocol,
} from "@auaust/toolkit/protocols";
import { type Emptiable, isEmpty } from "@auaust/toolkit/protocols/emptiable";
import { describe, expect, expectTypeOf, test } from "vitest";

const customProtocol: unique symbol = Symbol("customProtocol");

interface CustomImplementation {
  [customProtocol]: string;
}

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof customProtocol,
    CustomImplementation
  > {}
}

describe("protocols", () => {
  test("recognizes and narrows built-in protocols", () => {
    const value: unknown = {
      [isEmpty]: () => true,
    };

    expect(implementsProtocol(isEmpty, value)).toBe(true);

    if (implementsProtocol(isEmpty, value)) {
      expectTypeOf(value).toEqualTypeOf<Emptiable>();

      const typed = value[isEmpty];

      expectTypeOf(typed).toEqualTypeOf<(() => boolean) | boolean>();

      expect(resolve(typed)).toBe(true);
    }

    expect(empty(value)).toBe(true);
  });

  test("supports externally registered protocols", () => {
    const value: unknown = {
      [customProtocol]: "implemented",
    };

    expect(implementsProtocol(customProtocol, value)).toBe(true);

    if (implementsProtocol(customProtocol, value)) {
      const typed = value[customProtocol];

      expectTypeOf(value).toEqualTypeOf<CustomImplementation>();

      expect(typed).toBe("implemented");

      expectTypeOf(typed).toEqualTypeOf<string>();
    }
  });

  test("rejects missing protocols and primitive values", () => {
    expect(implementsProtocol(isEmpty, {})).toBe(false);
    expect(implementsProtocol(isEmpty, null)).toBe(false);
    expect(implementsProtocol(isEmpty, "value")).toBe(false);
  });
});
