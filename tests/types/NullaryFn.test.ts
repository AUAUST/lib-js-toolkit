import type { NullaryFn } from "@auaust/toolkit/types";
import { assertType, describe, expect, expectTypeOf, test } from "vitest";

describe.todo("NullaryFn", () => {
  test("works", () => {
    expectTypeOf<NullaryFn>().toEqualTypeOf<unknown>();
    assertType<NullaryFn>()
  });
});
