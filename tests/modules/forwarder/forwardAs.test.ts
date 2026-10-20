import { forwardAs, type ForwardAs } from "@auaust/toolkit/forwarder";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("forwardAs", () => {
  test.each(["property", 0, Symbol("property")] as const)("preserves key %s and alias literals", (key) => {
    const result = forwardAs(key, "alias");

    expect(result).toEqual({
      property: key,
      as: "alias",
    });
    expectTypeOf(result).toEqualTypeOf<ForwardAs<typeof key, "alias">>();
  });
});
