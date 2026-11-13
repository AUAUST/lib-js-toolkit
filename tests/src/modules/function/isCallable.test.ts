import { describe, expect, expectTypeOf, test } from "vitest";

import { isCallable } from "@auaust/toolkit/guard";
import { callable } from "@auaust/toolkit/protocol";

import {
  createFunctions,
  createObjects,
  primitiveValues,
} from "#tests/fixtures/values";

describe("isCallable", () => {
  test.for(createFunctions())("recognizes function %s", (input) => {
    expect(isCallable(input)).toBe(true);
    expectTypeOf(isCallable(input)).toEqualTypeOf<boolean>();
  });

  test.for([...primitiveValues, ...createObjects()])(
    "rejects non-callable %s",
    (input) => {
      expect(isCallable(input)).toBe(false);
    },
  );

  test("returns `true` for objects that implement the `Callable` protocol", () => {
    expect(
      isCallable({
        [callable]: () => {},
      }),
    ).toBe(true);

    expect(
      isCallable({
        get [callable]() {
          return () => {};
        },
      }),
    ).toBe(true);
  });
});
