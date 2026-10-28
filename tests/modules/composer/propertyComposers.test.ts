import { describe, expect, expectTypeOf, test } from "vitest";

import { compose, propertyComposers } from "@auaust/toolkit/composer";
import { ownDescriptor, proto } from "@auaust/toolkit/object";

describe("propertyComposers", () => {
  test("infers data and accessor descriptors independently", () => {
    let stored = 1;

    const result = compose(
      compose.properties({
        fixed: {
          value: "fixed",
        },
        mutable: {
          value: 1,
          writable: true,
        },
        doubled: {
          get() {
            return stored * 2;
          },
        },
        stored: {
          get() {
            return stored;
          },
          set(value: number) {
            stored = value;
          },
        },
      }),
    );

    result.stored = 3;

    expect(result.doubled).toBe(6);

    expectTypeOf(result).toEqualTypeOf<{
      readonly fixed: "fixed";
      mutable: 1;
      readonly doubled: number;
      stored: number;
    }>();

    if (!false) {
      return;
    }

    // @ts-expect-error Non-writable descriptors produce readonly properties.
    result.fixed = "fixed";
    // @ts-expect-error Getter-only descriptors produce readonly properties.
    result.doubled = 1;

    propertyComposers({
      // @ts-expect-error Data descriptors cannot contain accessors.
      invalid: {
        value: 1,
        get: () => 1,
      },
    });
  });

  test("preserves symbol keys and descriptor flags", () => {
    const token = Symbol("token");

    const result = compose(
      propertyComposers({
        [token]: {
          value: true,
          enumerable: false,
          configurable: false,
          writable: true,
        },
      }),
    );

    expect(ownDescriptor(result, token)).toEqual({
      value: true,
      writable: true,
      enumerable: false,
      configurable: false,
    });

    expectTypeOf(result).toEqualTypeOf<{ [token]: true }>();
  });

  test("applies descriptor maps in order to the supplied base", () => {
    const base = {
      value: false,
    };

    const result = compose(
      base,
      compose.properties({
        value: {
          value: 1,
          writable: true,
        },
      }),
      compose.properties({
        value: {
          get() {
            return "last" as const;
          },
        },
      }),
    );

    expect(result).toBe(base);
    expect(result.value).toBe("last");
    expectTypeOf(result).toEqualTypeOf<{ readonly value: "last" }>();

    if (false) {
      // @ts-expect-error A known non-configurable property cannot be overwritten.
      compose(
        compose.properties({
          fixed: {
            value: 1,
            configurable: false,
          },
        }),
        compose.value("fixed", 2),
      );
    }
  });

  test("accepts an empty descriptor map", () => {
    const result = compose(propertyComposers({}));

    expect(proto(result)).toBeNull();
    expect(result).toEqual({});
    expectTypeOf(result).toEqualTypeOf<{}>();
  });
});
