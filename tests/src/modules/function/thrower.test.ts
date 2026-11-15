import { describe, expect, expectTypeOf, test } from "vitest";

import { thrower } from "@auaust/toolkit/function";

describe("thrower", () => {
  test("throws a fresh error on each call", () => {
    const thrown = thrower(TypeError, "no");
    const errors: unknown[] = [];

    for (let index = 0; index < 2; index++) {
      try {
        thrown();
      } catch (error) {
        errors.push(error);
      }
    }

    expect(errors).toHaveLength(2);
    expect(errors[0]).toBeInstanceOf(TypeError);
    expect(errors[0]).toHaveProperty("message", "no");
    expect(errors[1]).toBeInstanceOf(TypeError);
    expect(errors[0]).not.toBe(errors[1]);
    expect(thrown.name).toBe("thrown");
  });

  test("fits any callback slot and checks constructor arguments", () => {
    expectTypeOf(thrower(Error, "no")).toExtend<(value: string) => number>();

    // @ts-expect-error Error takes a string message.
    thrower(Error, 1);
  });
});
