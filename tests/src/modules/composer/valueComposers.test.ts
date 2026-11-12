import { describe, expect, expectTypeOf, test } from "vitest";

import { compose, valueComposers } from "@auaust/toolkit/composer";
import { create, ownKeys } from "@auaust/toolkit/object";

describe("valueComposers", () => {
  test("includes own symbols and hidden keys but omits inherited keys", () => {
    const token = Symbol("token");

    const values = create(
      {
        inherited: 1,
      },
      {
        hidden: {
          value: 2,
        },
        [token]: {
          value: false,
        },
      },
    );

    const result = compose(valueComposers(values));

    expect(ownKeys(result)).toEqual(["hidden", token]);
    expect(result.hidden).toBe(2);
    expect(result[token]).toBe(false);
    expect(compose(valueComposers({}))).toEqual({});

    const inferred = compose(
      valueComposers({
        value: 1,
        empty: null,
      }),
    );

    expectTypeOf(inferred).toEqualTypeOf<{
      value: 1;
      empty: null;
    }>();
  });

  test("preserves optional and rest arguments", () => {
    const methods = {
      collect(first?: string, ...rest: string[]) {
        return [first, ...rest];
      },
    };

    const result = compose(valueComposers(methods));

    expect(result.collect).toBe(methods.collect);
    expect(result.collect("a", "b")).toEqual(["a", "b"]);
    expectTypeOf(result.collect).toEqualTypeOf<typeof methods.collect>();
    expect(compose(valueComposers({}))).toEqual({});
  });
});
