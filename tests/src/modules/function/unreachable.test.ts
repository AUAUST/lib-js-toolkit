import { describe, expect, expectTypeOf, test } from "vitest";

import { UnreachableError } from "@auaust/toolkit/errors";
import { unreachable } from "@auaust/toolkit/function";

describe("unreachable", () => {
  test("throws UnreachableError with the given or default message", () => {
    expect(() => unreachable("Message.")).toThrow(
      new UnreachableError("Message."),
    );

    expect(() => unreachable()).toThrow(
      "Reached a code path assumed unreachable.",
    );

    expect(() => unreachable()).toThrow(UnreachableError);
  });

  test("returns never", () => {
    expectTypeOf(unreachable).returns.toBeNever();
  });
});
