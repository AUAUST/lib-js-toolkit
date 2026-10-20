import { propertyForwarder } from "@auaust/toolkit/forwarder";
import { describe, expect, expectTypeOf, test } from "vitest";
import { createDescriptorSource } from "../../fixtures/descriptors";

describe("propertyForwarder", () => {
  test.each([
    ["locked", false, false, false],
    ["mutable", true, true, true],
    ["getter", true, true, false],
    ["writable", false, true, true],
  ] as const)("mirrors %s flags", (property, enumerable, configurable, writable) => {
    const source = createDescriptorSource();

    const descriptor = propertyForwarder(source, {
      property,
    });

    expect(descriptor.enumerable).toBe(enumerable);
    expect(descriptor.configurable).toBe(configurable);
    expect(typeof descriptor.set === "function").toBe(writable);
    expect(descriptor.get()).toBe(source[property]);
    expectTypeOf(descriptor.get()).toEqualTypeOf<number>();
  });

  test("overrides flags while respecting readonly source properties", () => {
    const source = createDescriptorSource();

    const descriptor = propertyForwarder(source, "mutable", {
      readonly: true,
      enumerable: false,
      configurable: false,
    });

    expect(descriptor.enumerable).toBe(false);
    expect(descriptor.configurable).toBe(false);
    expect(descriptor.set).toBeUndefined();

    for (const property of ["locked", "getter"] as const) {
      expect(
        propertyForwarder(source, property, {
          readonly: false,
        }).set,
      ).toBeUndefined();
    }
  });

  test("creates writable descriptors for absent and symbol properties", () => {
    const source: { later?: string } = {};
    const descriptor = propertyForwarder(source, "later");

    const symbol = propertyForwarder(
      {
        [Symbol.iterator]: 1,
      },
      Symbol.iterator,
    );

    expect(descriptor.enumerable).toBe(true);
    expect(descriptor.configurable).toBe(true);
    expect(descriptor.get()).toBeUndefined();
    expect(descriptor.set).toBeTypeOf("function");
    expect(symbol.get()).toBe(1);
    expect(symbol.set).toBeTypeOf("function");

    descriptor.set?.("initialized");

    expect(source.later).toBe("initialized");
    expect(descriptor.get()).toBe("initialized");
  });

  test("reads and writes the source live, including deletion", () => {
    const source: { value?: number } = {
      value: 42,
    };
    const descriptor = propertyForwarder(source, "value");

    expect(descriptor.get()).toBe(42);

    source.value = 100;

    expect(descriptor.get()).toBe(100);

    descriptor.set?.(200);

    expect(source.value).toBe(200);

    delete source.value;

    expect(descriptor.get()).toBeUndefined();
  });
});
