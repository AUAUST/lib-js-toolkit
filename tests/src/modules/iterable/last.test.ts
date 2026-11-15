import { describe, expect, expectTypeOf, test } from "vitest";

import { last } from "@auaust/toolkit/iterable";

describe("last", () => {
  test("reads the last value of a lazy source", () => {
    function* source() {
      yield "a";

      yield "b";
    }

    const result = last(source());

    expect(result).toBe("b");
    expectTypeOf(result).toEqualTypeOf<string | undefined>();
  });

  test("returns undefined for an empty or nullish source", () => {
    expect(last([])).toBeUndefined();
    expect(last(undefined)).toBeUndefined();
    expect(() => last(42 as never)).toThrow(TypeError);
  });
});
