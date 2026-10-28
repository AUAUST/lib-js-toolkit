/* eslint-disable auaust/no-invalid-void-type */

import { describe, expect, expectTypeOf, test } from "vitest";

import { noop } from "@auaust/toolkit";

import { createValues } from "../fixtures/values";

describe("noop", () => {
  test.for(createValues())("preserves no result for %s", (input) => {
    const result = noop(input, "ignored");

    expect(result).toBe(undefined);
    expectTypeOf(result).toEqualTypeOf<void>();
  });

  test("supports omitted arguments", () => {
    expect(noop()).toBeUndefined();
    expectTypeOf(noop).parameters.toEqualTypeOf<unknown[]>();
  });
});
