import { describe, expect, expectTypeOf, test } from "vitest";

import { assign } from "@auaust/toolkit/object";

import { createObjects } from "../../fixtures/values";

describe("assign", () => {
  test.for(createObjects())("accepts native target %s", (target) => {
    const result = assign(target, {
      fixture: "value" as const,
    });

    expect(result).toBe(target);
    expect(result.fixture).toBe("value");
    expectTypeOf(result.fixture).toEqualTypeOf<"value">();
  });

  test("retains native identity and infers successive overwrites", () => {
    const target = {
      value: 1,
    };

    const result = assign(
      target,
      {
        a: true,
      },
      {
        b: 2,
      },
      null,
      {
        value: "last" as const,
      },
      {
        c: 3,
      },
    );

    expectTypeOf(result).toEqualTypeOf<{
      value: "last";
      a: boolean;
      b: number;
      c: number;
    }>();
    expect(assign).toBe(Object.assign);
    expect(result).toBe(target);
    expect(result.value).toBe("last");
  });

  test("preserves generic call signatures and accepts an empty source list", () => {
    const target = <Value>(value: Value) => value;

    const result = assign(target, {
      label: "entry",
    });

    expectTypeOf(result("literal" as const)).toEqualTypeOf<"literal">();
    expectTypeOf(
      assign({
        value: 1,
      }),
    ).toEqualTypeOf<{ value: number }>();
    expect(result).toBe(target);
  });

  test("models optional properties and a variable number of sources", () => {
    const optional: { value?: number } = {};
    const sources: { value: number }[] = [];

    const target = {
      value: "initial",
    };

    const result = assign(target, optional);

    const variable = assign(
      {
        value: "initial",
      },
      ...sources,
    );

    expectTypeOf(result.value).toEqualTypeOf<string | number | undefined>();
    expectTypeOf(variable.value).toEqualTypeOf<string | number | undefined>();
    expect(result.value).toBe("initial");
    expect(variable.value).toBe("initial");
    expect(assign({}, "ab")).toEqual({
      0: "a",
      1: "b",
    });
  });
});
