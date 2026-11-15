import { describe, expect, expectTypeOf, test } from "vitest";

import { isArrayLike } from "@auaust/toolkit/guard";

function argumentsOf(..._values: unknown[]): unknown {
  // eslint-disable-next-line prefer-rest-params
  return arguments;
}

describe("isArrayLike", () => {
  test.for([[], "ab", { length: 2, 0: "a" }, argumentsOf(1)])(
    "accepts array-likes on case %#",
    (input) => {
      expect(isArrayLike(input)).toBe(true);
    },
  );

  test.for([() => {}, { length: -1 }, { length: 1.5 }, {}, null])(
    "rejects non-array-likes on case %#",
    (input) => {
      expect(isArrayLike(input)).toBe(false);
    },
  );

  test("narrows unknown and union candidates", () => {
    const unknownInput: unknown = [];
    const unionInput = [] as number | readonly string[];

    if (isArrayLike(unknownInput)) {
      expectTypeOf(unknownInput).toEqualTypeOf<ArrayLike<unknown>>();
    }

    if (isArrayLike(unionInput)) {
      expectTypeOf(unionInput).toEqualTypeOf<readonly string[]>();
    } else {
      expectTypeOf(unionInput).toEqualTypeOf<number>();
    }
  });
});
