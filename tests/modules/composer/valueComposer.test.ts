import { compose, valueComposer } from "@auaust/toolkit/composer";
import { ownDescriptor } from "@auaust/toolkit/object";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("valueComposer", () => {
  test("defines writable values, including special keys", () => {
    const token = Symbol("token");

    const result = compose(valueComposer("__proto__", null), valueComposer(token, undefined), valueComposer(0, false));

    expect(ownDescriptor(result, "__proto__")).toEqual({
      value: null,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    expect(result[token]).toBeUndefined();
    expect(result[0]).toBe(false);
    expectTypeOf(result).toEqualTypeOf<{
      __proto__: null;
      [token]: undefined;
      0: false;
    }>();
  });

  test("preserves generic signatures and function identity", () => {
    function identity<Value>(value: Value): Value {
      return value;
    }

    const result = compose(valueComposer("identity", identity));

    expect(result.identity).toBe(identity);
    expectTypeOf(result.identity).toEqualTypeOf<typeof identity>();
    expectTypeOf(result.identity("literal")).toEqualTypeOf<string>();
  });
});
