import { finalize } from "@auaust/toolkit/object";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("finalize", () => {
  test("assigns sources in order and shallowly freezes the target", () => {
    const target = {
      value: 1,
    };
    const child = {
      value: 2,
    };

    const result = finalize(
      target,
      {
        value: "changed" as const,
      },
      {
        child,
      },
    );

    expectTypeOf(result.value).toEqualTypeOf<"changed">();
    expect(result).toBe(target);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.child)).toBe(false);

    if (false) {
      // @ts-expect-error Finalized data properties are readonly.
      result.value = "changed";
    }
  });

  test("preserves overloads and generic function inference", () => {
    function overloaded(value: string): string;

    function overloaded(value: number): number;

    function overloaded(value: string | number): string | number {
      return value;
    }

    const result = finalize(overloaded, {
      label: "entry" as const,
    });

    const identity = finalize(<Value,>(value: Value) => value, {
      label: "identity",
    });

    expectTypeOf(result("entry")).toEqualTypeOf<string>();
    expectTypeOf(result(1)).toEqualTypeOf<number>();
    expectTypeOf(identity("literal" as const)).toEqualTypeOf<"literal">();
    expectTypeOf(result.label).toEqualTypeOf<"entry">();
    expect(result).toBe(overloaded);
    expect(result(2)).toBe(2);
  });

  test("keeps setters callable", () => {
    let stored = 0;

    const result = finalize({
      get value() {
        return stored;
      },
      set value(next: number) {
        stored = next;
      },
    });

    Reflect.set(result, "value", 4);

    expect(result.value).toBe(4);
  });
});
