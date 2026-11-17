import { describe, expect, expectTypeOf, test } from "vitest";

import { UnreachableError } from "@auaust/toolkit/errors";
import { fail } from "@auaust/toolkit/function";

describe("fail", () => {
  test("throws an Error with the message and cause", () => {
    const cause = new Error("cause");

    expect(() => fail("Message.", { cause })).toThrow(
      expect.objectContaining({ message: "Message.", cause }),
    );
  });

  test("throws an instance of the given class with its arguments", () => {
    expect(() => fail(TypeError, "x")).toThrow(TypeError);

    expect(() => fail(TypeError, "x")).toThrow("x");

    // @ts-expect-error TypeError takes no number as its message.
    expect(() => fail(TypeError, 1)).toThrow(TypeError);
  });

  test("returns never and works as an expression", () => {
    expectTypeOf(fail).returns.toBeNever();

    const maybe = "value" as string | undefined;
    const value: string = maybe ?? fail();

    expect(value).toBe("value");
  });
});

describe("UnreachableError", () => {
  test("has a default message, its name and forwards its cause", () => {
    const cause = new Error("cause");
    const error = new UnreachableError(undefined, { cause });

    expect(error.message).toBe("Reached a code path assumed unreachable.");
    expect(error.name).toBe("UnreachableError");
    expect(error).toBeInstanceOf(Error);
    expect(error).not.toBeInstanceOf(TypeError);
    expect(error.cause).toBe(cause);
  });
});
