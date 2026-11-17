import { describe, expect, test } from "vitest";

import { UnreachableError } from "@auaust/toolkit/errors";
import { unreachable } from "@auaust/toolkit/function";

type Kind = "a" | "b";

function partial(kind: Kind): number {
  switch (kind) {
    case "a": {
      return 1;
    }
    default: {
      // @ts-expect-error The "b" case is missing.
      return unreachable(kind);
    }
  }
}

function exhaustive(kind: Kind): number {
  switch (kind) {
    case "a": {
      return 1;
    }
    case "b": {
      return 2;
    }
    default: {
      return unreachable(kind);
    }
  }
}

describe("unreachable", () => {
  test("throws UnreachableError with the given or default message", () => {
    expect(() => unreachable(undefined, "Message.")).toThrow(
      new UnreachableError("Message."),
    );

    expect(() => unreachable()).toThrow(
      "Reached a code path assumed unreachable.",
    );

    expect(() => unreachable()).toThrow(UnreachableError);
  });

  test("checks exhaustiveness through the narrowed value", () => {
    expect(exhaustive("b")).toBe(2);

    expect(() => partial("b")).toThrow(UnreachableError);
  });
});
