import { readonly } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("readonly()", () => {
  test("prevents modifications to the underlying object", () => {
    const obj = readonly({ a: 1 });

    expect(() => {
      // @ts-expect-error
      obj.a = 2;
    }).toThrow();

    expect(() => {
      // @ts-expect-error
      delete obj.a;
    }).toThrow();

    expect(() => {
      Object.defineProperty(obj, "a", { value: 2 });
    }).toThrow();

    expect(() => {
      Object.preventExtensions(obj);
    }).toThrow();
  });

  test("does not impact the original object", () => {
    const original = { a: 1 };
    const read = readonly(original);

    expect(() => {
      // @ts-expect-error
      read.a = 2;
    }).toThrow();

    expect(original.a).toBe(1);

    original.a = 2;

    expect(read.a).toBe(2);
  });

  test("shares the same proxy for the same object", () => {
    const original = { a: 1 };

    const read1 = readonly(original);

    const read2 = readonly(original);

    expect(read1).toBe(read2);
  });

  test("correctly identifies readonly objects", () => {
    const original = { a: 1 };
    const read = readonly(original);

    expect(readonly.isReadonly(read)).toBe(true);
    expect(readonly.isReadonly(original)).toBe(false);
  });

  test("prevents array modifications", () => {
    const arr = readonly([1, 2, 3]);

    expect(() => {
      // @ts-expect-error
      arr[0] = 4;
    }).toThrow();

    expect(() => {
      // @ts-expect-error
      arr.push(4);
    }).toThrow();

    expect(() => {
      // @ts-expect-error
      arr.pop();
    }).toThrow();
  });
});
