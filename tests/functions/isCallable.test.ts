import { isCallable } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, test } from "vitest";

describe("isCallable()", () => {
  test("returns `true` for functions", () => {
    expect(isCallable(() => {})).toBe(true);
    expect(isCallable(function () {})).toBe(true);
    expect(isCallable(async function () {})).toBe(true);
    expect(isCallable(class {})).toBe(true);
  });

  test("returns `true` for objects that implement the `Callable` protocol", () => {
    expect(isCallable({ [callable]: () => {} })).toBe(true);

    expect(
      isCallable({
        get [callable]() {
          return () => {};
        },
      }),
    ).toBe(true);
  });

  test("returns `false` for non-callable values", () => {
    expect(isCallable(null)).toBe(false);
    expect(isCallable(undefined)).toBe(false);
    expect(isCallable(123)).toBe(false);
    expect(isCallable("string")).toBe(false);
    expect(isCallable({})).toBe(false);
  });
});
