import { describe, expect, expectTypeOf, test } from "vitest";

import { implementsProtocol } from "@auaust/toolkit/protocols";
import { countOf, type Countable } from "@auaust/toolkit/protocols/countable";

describe("countable", () => {
  test("is properly recognized and narrowed by `implementsProtocol()`", () => {
    const value: unknown = {
      [countOf]: () => 3,
    };

    expect(implementsProtocol(countOf, value)).toBe(true);

    if (implementsProtocol(countOf, value)) {
      expectTypeOf(value).toEqualTypeOf<Countable>();
      expectTypeOf(value[countOf]).toEqualTypeOf<() => number>();
      expect(value[countOf]()).toBe(3);
    }
  });
});
