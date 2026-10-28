import { describe, expect, expectTypeOf, test } from "vitest";

import {
  forwardAs,
  methodForwarders,
  type MethodForwarder,
} from "@auaust/toolkit/forwarder";

describe("methodForwarders", () => {
  test("handles the spread call form", () => {
    const source = {
      foo(): number {
        return 1;
      },
      bar(): string {
        return "bar";
      },
    };

    const forwarders = methodForwarders(source, "foo", {
      method: "bar",
    });

    expect(forwarders).toHaveLength(2);
    expect(forwarders[0].get()()).toBe(1);
    expect(forwarders[1].get()()).toBe("bar");
  });

  test("handles the array call form", () => {
    const source = {
      foo(): number {
        return 1;
      },
      bar(): string {
        return "bar";
      },
    };

    const forwarders = methodForwarders(source, [
      "foo",
      {
        method: "bar",
      },
    ]);

    expect(forwarders).toHaveLength(2);
    expect(forwarders[0].get()()).toBe(1);
    expect(forwarders[1].get()()).toBe("bar");
  });

  test("preserves entries across mixed scalar and array arguments", () => {
    const source = {
      foo(): number {
        return 1;
      },
      bar(): string {
        return "bar";
      },
    };

    const forwarders = methodForwarders(source, ["foo"], {
      method: "bar",
    });

    expectTypeOf(forwarders).toEqualTypeOf<
      (
        | MethodForwarder<typeof source, "foo">
        | MethodForwarder<typeof source, "bar">
      )[]
    >();
  });

  test("preserves numeric and symbol methods across every input form", () => {
    const token = Symbol("method");

    const source = {
      value: 1,
      0() {
        return 0 as const;
      },
      [token]() {
        return "symbol" as const;
      },
      plain() {
        return true;
      },
    };

    const forwarders = methodForwarders(
      source,
      0,
      [
        token,
        {
          method: "plain",
          as: "renamed",
        },
      ],
      forwardAs(0, "zero"),
      {
        method: token,
        as: "symbol",
        enumerable: true,
      },
      forwardAs(token, "aliasedSymbol"),
    );

    expect(forwarders.map((entry) => entry.name)).toEqual([
      0,
      token,
      "renamed",
      "zero",
      "symbol",
      "aliasedSymbol",
    ]);

    expect(forwarders.map((entry) => entry.get()())).toEqual([
      0,
      "symbol",
      true,
      0,
      "symbol",
      "symbol",
    ]);

    expect(forwarders[4].enumerable).toBe(true);

    expectTypeOf(forwarders).toEqualTypeOf<
      (
        | MethodForwarder<typeof source, 0>
        | MethodForwarder<typeof source, typeof token>
        | MethodForwarder<typeof source, "plain", "renamed">
        | MethodForwarder<typeof source, 0, "zero">
        | MethodForwarder<typeof source, typeof token, "symbol">
        | MethodForwarder<typeof source, typeof token, "aliasedSymbol">
      )[]
    >();

    if (!false) {
      return;
    }

    // @ts-expect-error Data properties cannot be forwarded as methods.
    methodForwarders(source, "value");
    // @ts-expect-error Aliased inputs must name a method on the source.
    methodForwarders(source, forwardAs("value", "alias"));
    // @ts-expect-error Missing numeric keys are rejected.
    methodForwarders(source, 1);
  });
});
