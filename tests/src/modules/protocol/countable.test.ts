import { describe, expect, expectTypeOf, test } from "vitest";

import {
  countable,
  implementsProtocol,
  type Countable,
} from "@auaust/toolkit/protocol";

describe("countable", () => {
  test("is properly recognized and narrowed by `implementsProtocol()`", () => {
    const value: unknown = {
      [countable]: () => 3,
    };

    expect(implementsProtocol(countable, value)).toBe(true);

    if (!implementsProtocol(countable, value)) {
      return;
    }

    expectTypeOf(value).toEqualTypeOf<Countable>();
    expectTypeOf(value[countable]).toEqualTypeOf<() => number>();
    expect(value[countable]()).toBe(3);
  });
});
