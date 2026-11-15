import { describe, expect, expectTypeOf, test } from "vitest";

import { mapArguments } from "@auaust/toolkit/function";
import { callable } from "@auaust/toolkit/protocol";

describe("mapArguments", () => {
  test("maps the arguments before calling the closure", () => {
    const mapped = mapArguments(
      (a: number, b: number) => a + b,
      (value: string) => {
        return [Number(value), 1] as [number, number];
      },
    );

    expectTypeOf(mapped).parameters.toEqualTypeOf<[value: string]>();
    expectTypeOf(mapped).returns.toEqualTypeOf<number>();
    expect(mapped("2")).toBe(3);
    expect(mapped.name).toBe("mapped");
  });

  test("forwards the receiver to a callable resolved once", () => {
    let reads = 0;

    const closure = {
      get [callable]() {
        reads++;

        return function (this: { factor: number }, value: number) {
          return this.factor * value;
        };
      },
    };

    const mapped = mapArguments(closure, (value: number) => {
      return [value + 1] as const;
    });

    expect(mapped.call({ factor: 2 }, 1)).toBe(4);
    expect(mapped.call({ factor: 3 }, 1)).toBe(6);
    expect(reads).toBe(1);
  });
});
