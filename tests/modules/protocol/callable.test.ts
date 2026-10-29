import { describe, expectTypeOf, test } from "vitest";

import {
  callable,
  implementsProtocol,
  type Callable,
} from "@auaust/toolkit/protocol";

describe("callable", () => {
  test("is properly recognized by `implementsProtocol()`", () => {
    const value: unknown = {};

    if (implementsProtocol(callable, value)) {
      expectTypeOf(value).toEqualTypeOf<Callable>();
    }
  });
});
