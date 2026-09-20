import { describe, expect, expectTypeOf, test } from "vitest";
import type { PropertyForwarder } from "~/functions/propertyForwarder";
import { propertyForwarders } from "~/functions/propertyForwarders";

describe("propertyForwarders()", () => {
  test("handles the spread call form", () => {
    const source = { foo: 1, bar: "bar" };

    const forwarders = propertyForwarders(source, "foo", {
      property: "bar",
      readonly: true,
    });

    expect(forwarders).toHaveLength(2);
    expect(forwarders[0].get()).toBe(source.foo);
    expect(forwarders[1].get()).toBe(source.bar);
  });

  test("handles the array call form", () => {
    const source = { foo: 1, bar: "bar" };

    const forwarders = propertyForwarders(source, [
      "foo",
      { property: "bar", readonly: true },
    ]);

    expect(forwarders).toHaveLength(2);
    expect(forwarders[0].get()).toBe(source.foo);
    expect(forwarders[1].get()).toBe(source.bar);
  });

  test("preserves the property and readonly pairs", () => {
    const source = { foo: 1, bar: "bar" };

    const forwarders = propertyForwarders(source, [
      "foo",
      { property: "bar", readonly: true },
    ]);

    expectTypeOf(forwarders).toEqualTypeOf<
      (
        | PropertyForwarder<typeof source, "foo">
        | PropertyForwarder<typeof source, "bar", true>
      )[]
    >();
  });
});
