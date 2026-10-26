import { describe, expectTypeOf, test } from "vitest";

import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable, type Callable } from "@auaust/toolkit/protocols/callable";

describe("callable", () => {
  test("is properly recognized by `implementsProtocol()`", () => {
    const value: unknown = {};

    if (implementsProtocol(callable, value)) {
      expectTypeOf(value).toEqualTypeOf<Callable>();
    }
  });
});
