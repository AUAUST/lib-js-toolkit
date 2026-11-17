import { describe, expect, expectTypeOf, test } from "vitest";

import { applyWith } from "@auaust/toolkit/function";
import { callable } from "@auaust/toolkit/protocol";

describe("applyWith", () => {
  test("calls a function with the receiver and the argument list", () => {
    function join(this: { separator: string }, a: string, b: string) {
      return `${a}${this.separator}${b}`;
    }

    const result = applyWith(join, { separator: "-" }, ["a", "b"]);

    expect(result).toBe("a-b");
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  test("passes a Callable itself as the receiver only when none is given", () => {
    const input = {
      [callable](this: unknown) {
        return this;
      },
    };

    expect(applyWith(input, undefined)).toBe(input);
    expect(applyWith(input, null)).toBeNull();
  });

  test("ignores own call and apply properties of the callback", () => {
    const fn = Object.assign((x: number) => x * 2, { apply: () => -1 });

    expect(applyWith(fn, undefined, [3])).toBe(6);
  });

  test("throws a TypeError when the callback is not callable", () => {
    // @ts-expect-error A number is not callable.
    expect(() => applyWith(42, undefined, [])).toThrow(TypeError);
  });
});
