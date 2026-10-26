import { describe, expect, expectTypeOf, test } from "vitest";

import { compose, getterComposers } from "@auaust/toolkit/composer";

describe("getterComposers", () => {
  test("preserves symbol keys and receiver binding", () => {
    const token = Symbol("token");

    const result = compose(
      {
        count: 2,
      },
      getterComposers({
        [token](this: { count: number }) {
          return this.count;
        },
      }),
    );

    expect(result[token]).toBe(2);
    expectTypeOf(result).toEqualTypeOf<{
      count: number;
      readonly [token]: number;
    }>();
    expect(compose(getterComposers({}))).toEqual({});
  });
});
