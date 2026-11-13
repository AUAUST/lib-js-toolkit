import { describe, expectTypeOf, test } from "vitest";

import { ensureMethod } from "@auaust/toolkit";
import { isMethod } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureMethod", () => {
  testEnsure(
    (candidate: unknown, message?: string) => {
      return ensureMethod(candidate, Symbol.iterator, message);
    },
    (candidate: unknown) => isMethod(candidate, Symbol.iterator),
    "Expected a method.",
  );

  test("types unknown as holding the method and keeps known targets", () => {
    const thenable: unknown = Promise.resolve();

    expectTypeOf(ensureMethod(thenable, "then")).toEqualTypeOf<{
      then(...args: unknown[]): unknown;
    }>();

    const known = {
      method(): number {
        return 1;
      },
    };

    expectTypeOf(ensureMethod(known, "method")).toEqualTypeOf<typeof known>();
  });
});
