import { describe, expect, expectTypeOf, test } from "vitest";

import { mapReturn } from "@auaust/toolkit/function";

describe("mapReturn", () => {
  test("maps the result with the closure's receiver and arguments", () => {
    function scale(this: { factor: number }, value: number) {
      return this.factor * value;
    }

    const mapped = mapReturn(scale, String);

    expectTypeOf(mapped).returns.toEqualTypeOf<string>();
    expect(mapped.call({ factor: 2 }, 3)).toBe("6");
    expect(mapped.name).toBe("mapped");
  });

  test("receives the promise, not its value", async () => {
    const mapped = mapReturn(() => Promise.resolve(1), String);

    expect(mapped()).toBe("[object Promise]");

    const awaited = mapReturn(
      () => Promise.resolve(1),
      async (promise) => String(await promise),
    );

    await expect(awaited()).resolves.toBe("1");
  });
});
