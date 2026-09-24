import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable, type Callable } from "@auaust/toolkit/protocols/callable";
import { describe, expectTypeOf, test } from "vitest";

describe("The callable protocol", () => {
  test("is properly recognized by `implementsProtocol()`", () => {
    const value: unknown = {};

    if (implementsProtocol(callable, value)) {
      expectTypeOf(value).toEqualTypeOf<Callable>();
    }
  });
});
