import type { Constructor } from "@auaust/toolkit/types";
import { assertType, describe, expect, expectTypeOf, test } from "vitest";

describe.todo("Constructor", () => {
  test("works", () => {
    expectTypeOf<Constructor>().toEqualTypeOf<unknown>();
    assertType<Constructor>()
  });
});
