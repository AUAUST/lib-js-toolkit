import { compose, propertyComposer } from "@auaust/toolkit/composer";
import { ownDescriptor } from "@auaust/toolkit/object";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("propertyComposer", () => {
  test("preserves accessors and descriptor flags", () => {
    let stored = 1;

    const result = compose(
      propertyComposer("value", {
        get() {
          return stored;
        },
        set(value: number) {
          stored = value;
        },
        enumerable: false,
      }),
    );

    result.value = 3;

    expect(result.value).toBe(3);
    expect(ownDescriptor(result, "value")?.enumerable).toBe(false);
    expectTypeOf(result).toEqualTypeOf<{ value: number }>();
  });

  test("infers readonly and writable data descriptors", () => {
    const result = compose(
      propertyComposer("fixed", {
        value: "fixed",
      }),
      propertyComposer("mutable", {
        value: 1,
        writable: true,
      }),
    );

    expectTypeOf(result).toEqualTypeOf<{
      readonly fixed: "fixed";
      mutable: 1;
    }>();
    expect(ownDescriptor(result, "fixed")).toEqual({
      value: "fixed",
      writable: false,
      enumerable: true,
      configurable: true,
    });

    if (false) {
      // @ts-expect-error Data descriptors cannot contain accessors.
      propertyComposer("invalid", {
        value: 1,
        get: () => 1,
      });
      // @ts-expect-error Accessor descriptors cannot specify writability.
      propertyComposer("invalid", {
        writable: true,
        get: () => 1,
      });
      // @ts-expect-error Non-writable descriptors produce readonly properties.
      result.fixed = "fixed";
    }
  });
});
