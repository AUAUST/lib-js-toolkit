import { describe, expect, expectTypeOf, test } from "vitest";

import { tryCall } from "@auaust/toolkit/function";
import { callable } from "@auaust/toolkit/protocol";

describe("tryCall", () => {
  test("returns the result, or undefined when fn throws", () => {
    const result = tryCall((a: number, b: number) => a + b, 2, 3);

    expectTypeOf(result).toEqualTypeOf<number | undefined>();
    expect(result).toBe(5);

    expect(
      tryCall(() => {
        throw new Error("failure");
      }),
    ).toBeUndefined();
  });

  test("forwards the receiver to functions and callables", () => {
    function read(this: { value: number }) {
      return this.value;
    }

    const counter = {
      value: 2,
      [callable]() {
        return this.value;
      },
    };

    expect(tryCall.call({ value: 1 }, read)).toBe(1);
    expect(tryCall(counter)).toBe(2);
    expect(tryCall.call({ value: 3 }, counter)).toBe(3);
  });
});
