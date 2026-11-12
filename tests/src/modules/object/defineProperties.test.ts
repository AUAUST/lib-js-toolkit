import { describe, expect, expectTypeOf, test } from "vitest";

import { defineProperties } from "@auaust/toolkit/object";

describe("defineProperties", () => {
  test("infers each descriptor and getter-only writability", () => {
    const result = defineProperties(
      {
        existing: false,
      },
      {
        value: {
          value: 1,
          writable: true,
        },
        label: {
          get() {
            return "entry" as const;
          },
        },
      },
    );

    expectTypeOf(result.value).toEqualTypeOf<1>();
    expectTypeOf(result.label).toEqualTypeOf<"entry">();
    expectTypeOf(result.existing).toEqualTypeOf<boolean>();
    expect(defineProperties).toBe(Object.defineProperties);
    expect(result.label).toBe("entry");

    if (false) {
      // @ts-expect-error Getter-only properties are readonly.
      result.label = "entry";
    }
  });

  test("contextually types accessor receivers", () => {
    const result = defineProperties(
      {
        count: 2,
      },
      {
        doubled: {
          get() {
            return this.count * 2;
          },
        },
      },
    );

    expectTypeOf(result.doubled).toEqualTypeOf<number>();
    expect(result.doubled).toBe(4);
  });
});
