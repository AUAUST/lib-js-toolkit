import { describe, expectTypeOf, test } from "vitest";

import { ensureCallableMember, type Callee } from "@auaust/toolkit";
import { isCallableMember } from "@auaust/toolkit/guard";

import { testEnsure } from "#tests/fixtures/assertions";

describe("ensureCallableMember", () => {
  testEnsure(
    (candidate: unknown, message?: string) => {
      return ensureCallableMember(candidate, Symbol.iterator, message);
    },
    (candidate: unknown) => isCallableMember(candidate, Symbol.iterator),
    "Expected a callable member.",
  );

  test("types unknown as holding the callable and keeps known targets", () => {
    const thenable: unknown = Promise.resolve();

    expectTypeOf(ensureCallableMember(thenable, "then")).toEqualTypeOf<{
      then: Callee;
    }>();

    const known = {
      member(): number {
        return 1;
      },
    };

    expectTypeOf(ensureCallableMember(known, "member")).toEqualTypeOf<
      typeof known
    >();
  });
});
