import { describe, expect, expectTypeOf, test } from "vitest";

import { callWith } from "@auaust/toolkit/function";
import { callable } from "@auaust/toolkit/protocol";

describe("callWith", () => {
  test("calls a function with the receiver and the rest arguments", () => {
    function join(this: { separator: string }, a: string, b: string) {
      return `${a}${this.separator}${b}`;
    }

    const result = callWith(join, { separator: "-" }, "a", "b");

    expect(result).toBe("a-b");
    expectTypeOf(result).toEqualTypeOf<string>();

    // @ts-expect-error The second argument must be a string.
    callWith(join, { separator: "-" }, "a", 1);
  });

  test("passes a Callable itself as the receiver only when none is given", () => {
    const input = {
      [callable](this: unknown, value: number) {
        return [this, value];
      },
    };

    expect(callWith(input, undefined, 1)).toEqual([input, 1]);
    expect(callWith(input, 0, 1)).toEqual([0, 1]);
  });
});
