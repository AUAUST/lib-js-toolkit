import { describe, expect, expectTypeOf, test } from "vitest";

import { retain } from "@auaust/toolkit/array";
import { isString } from "@auaust/toolkit/guard";

describe("retain", () => {
  test("keeps the accepted items in place and returns the array", () => {
    const array = [1, 2, 3, 4];
    const result = retain(array, (n) => n % 2 === 0);

    expect(result).toBe(array);
    expect(array).toEqual([2, 4]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("leaves what filter returns on a holey array", () => {
    const array: number[] = [];

    array[0] = 1;
    array[2] = 2;
    array[4] = 3;

    const expected = array.filter(() => true);

    let calls = 0;

    retain(array, () => {
      calls++;

      return true;
    });

    expect(array).toEqual(expected);
    expect(calls).toBe(3);
  });

  test("keeps items whose member is truthy and passes nullish through", () => {
    const array = [{ on: true }, { on: false }, { on: true }];

    expect(retain(array, "on")).toEqual([{ on: true }, { on: true }]);
    expect(retain(null as typeof array | null, "on")).toBeUndefined();
  });

  test("narrows with a type predicate", () => {
    const array: (number | string)[] = [1, "a"];

    expectTypeOf(retain(array, isString)).toEqualTypeOf<string[]>();
  });
});
