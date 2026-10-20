import { readonly } from "@auaust/toolkit";
import { ReadonlyError } from "@auaust/toolkit/errors";
import { describe, expect, expectTypeOf, test } from "vitest";
import { createValues } from "../fixtures/values";

describe("readonly", () => {
  test.each([
    (target: object) => {
      return Reflect.set(target, "value", 2);
    },
    (target: object) => {
      return Reflect.deleteProperty(target, "value");
    },
    (target: object) => {
      return Object.defineProperty(target, "value", {
        value: 2,
      });
    },
    (target: object) => {
      return Object.preventExtensions(target);
    },
    (target: object) => {
      return Object.setPrototypeOf(target, null);
    },
  ])("rejects mutation %s", (mutate) => {
    const original = {
      value: 1,
    };
    const read = readonly(original);

    expect(() => mutate(read)).toThrow(ReadonlyError);
    expect(original.value).toBe(1);
    expectTypeOf(read).toEqualTypeOf<Readonly<typeof original>>();

    original.value = 3;

    expect(read.value).toBe(3);
  });

  test("reuses proxies and already readonly values", () => {
    const original = {};
    const read = readonly(original);

    expect(read).not.toBe(original);
    expect(readonly(original)).toBe(read);
    expect(readonly(read)).toBe(read);
    expect(readonly(readonly(read))).toBe(read);
  });

  test("preserves readonly tuples and rejects array mutations", () => {
    const read = readonly([1, 2, 3] as const);

    expectTypeOf(read).toEqualTypeOf<readonly [1, 2, 3]>();
    // @ts-expect-error Readonly array indices cannot be assigned.
    expect(() => (read[0] = 4)).toThrow(ReadonlyError);
    // @ts-expect-error Readonly arrays cannot be extended.
    expect(() => read.push(4)).toThrow(ReadonlyError);
    // @ts-expect-error Readonly arrays cannot be shortened.
    expect(() => read.pop()).toThrow(ReadonlyError);
  });

  describe("isReadonly", () => {
    test.for(createValues())("recognizes only toolkit proxies for %s", (input) => {
      expect(readonly.isReadonly(input)).toBe(false);
      expectTypeOf(readonly.isReadonly(input)).toEqualTypeOf<boolean>();

      if (input !== null && (typeof input === "object" || typeof input === "function")) {
        expect(readonly.isReadonly(readonly(input))).toBe(true);
      }
    });
  });
});
