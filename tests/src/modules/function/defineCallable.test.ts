import { describe, expect, expectTypeOf, test } from "vitest";

import { call, defineCallable, memoize } from "@auaust/toolkit/function";
import { callable } from "@auaust/toolkit/protocol";

describe("defineCallable", () => {
  test("reads the named method on every access, while memoize keeps the one it resolved", () => {
    const object = defineCallable(
      {
        run(value: number): number {
          return value * 2;
        },
      },
      "run",
    );

    const memoized = memoize(object);

    object.run = (value) => value * 3;

    expect(call(object, 1)).toBe(3);
    expect(memoized(1)).toBe(2);
    expectTypeOf(call(object, 1)).toEqualTypeOf<number>();
  });

  test("assigns a function", () => {
    const object = defineCallable({}, () => "ran");

    expect(object[callable]).toBeTypeOf("function");
    expect(call(object)).toBe("ran");
  });

  test("throws a TypeError when the named member is not a function", () => {
    const object: { run: unknown } = { run: 1 };

    // @ts-expect-error run is not a method.
    expect(() => defineCallable(object, "run")).toThrow(TypeError);
  });
});
