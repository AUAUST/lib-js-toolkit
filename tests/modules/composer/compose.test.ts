import { describe, expect, expectTypeOf, test } from "vitest";

import {
  compose,
  getterComposer,
  getterComposers,
  propertyComposer,
  propertyComposers,
  valueComposer,
  valueComposers,
} from "@auaust/toolkit/composer";
import {
  create,
  defineProperty,
  entries,
  hasOwn,
  ownDescriptor,
  proto,
} from "@auaust/toolkit/object";

import { createInstances } from "../../fixtures/values";

describe("compose", () => {
  test.for(createInstances())("accepts native target %s", (target) => {
    const result = compose(target, compose.value("fixture", "value"));

    expect(result).toBe(target);
    expect(result.fixture).toBe("value");
    expectTypeOf(result.fixture).toEqualTypeOf<"value">();
  });

  describe.each(
    entries({
      getter: getterComposer,
      getters: getterComposers,
      method: valueComposer,
      methods: valueComposers,
      property: propertyComposer,
      properties: propertyComposers,
      value: valueComposer,
      values: valueComposers,
    }),
  )("%s", (name, helper) => {
    test("exposes the standalone helper with its signature", () => {
      expect(compose[name]).toBe(helper);
      expectTypeOf(compose[name]).toEqualTypeOf<typeof helper>();
    });
  });

  test("creates null-prototype objects without a base", () => {
    const empty = compose();
    const result = compose(compose.value("value", 1));

    expect(proto(empty)).toBeNull();
    expect(proto(result)).toBeNull();
    expect(result.value).toBe(1);
    expectTypeOf(empty).toEqualTypeOf<{}>();
    expectTypeOf(result).toEqualTypeOf<{ value: 1 }>();
  });

  test("distinguishes a first descriptor from a base using its keys", () => {
    const descriptor = {
      name: "answer" as const,
      value: 42,
    };

    const result = compose(descriptor);

    const base = {
      name: "base",
      extra: true,
    };

    const extended = compose(base, compose.value("added", 1));
    const empty = {};

    expect(proto(result)).toBeNull();
    expect(result.answer).toBe(42);
    expect(extended).toBe(base);
    expect(extended.name).toBe("base");
    expect(compose(empty)).toBe(empty);
    expectTypeOf(extended).toEqualTypeOf<{
      name: string;
      extra: boolean;
      added: 1;
    }>();
  });

  test("handles later entries as descriptors without applying the heuristic", () => {
    const result = compose(
      {},
      {
        ...compose.value("answer", 42),
        extra: true,
      },
    );

    expect(result.answer).toBe(42);
    expect(hasOwn(result, "extra")).toBe(false);
    expectTypeOf(result).toEqualTypeOf<{ answer: 42 }>();
  });

  test("accepts a plural helper first without a base", () => {
    const result = compose(
      compose.values({
        answer: 42,
        ready: true,
      }),
    );

    expect(proto(result)).toBeNull();
    expect(result.answer).toBe(42);
    expect(result.ready).toBe(true);
    expectTypeOf(result).toEqualTypeOf<{ answer: 42; ready: true }>();
  });

  test("extends the base in place without reading existing getters", () => {
    let reads = 0;

    const prototype = {
      inherited: true,
    };

    const base = create(prototype, {
      hidden: {
        value: 1,
        enumerable: false,
      },
      lazy: {
        get() {
          reads += 1;

          return this.value;
        },
        configurable: true,
      },
    });

    const result = compose(base, compose.value("value", 2));

    expect(result).toBe(base);
    expect(reads).toBe(0);
    expect(proto(result)).toBe(prototype);
    expect(ownDescriptor(result, "hidden")).toEqual(
      ownDescriptor(base, "hidden"),
    );
    expect(result.lazy).toBe(2);
    expect(hasOwn(base, "value")).toBe(true);
  });

  test("applies overrides sequentially in values and types", () => {
    const base = {
      value: "base",
      untouched: true,
    };

    const result = compose(
      base,
      compose.value("value", 1),
      compose.getter("value", () => false),
      compose.values({
        value: "last",
      }),
    );

    expect(result.value).toBe("last");
    expect(base.value).toBe("last");
    expectTypeOf(result).toEqualTypeOf<{
      untouched: boolean;
      value: "last";
    }>();
  });

  test("infers mixed entries and preserves function signatures", async () => {
    const token = Symbol("token");

    const result = compose(
      {},
      compose.value(token, undefined),
      compose.getters({
        bar() {
          return 2;
        },
        boz() {
          return true;
        },
      }),
      compose.method("async", async (value: string) => {
        return value.length;
      }),
      compose.methods({
        meep(value?: number) {
          return value ?? 0;
        },
      }),
    );

    expect(proto(result)).toBe(proto({}));
    expect(result.bar).toBe(2);
    expect(result.boz).toBe(true);
    expect(await result.async("test")).toBe(4);
    expect(result.meep()).toBe(0);
    expectTypeOf(result).toEqualTypeOf<{
      [token]: undefined;
      readonly bar: number;
      readonly boz: boolean;
      async: (value: string) => Promise<number>;
      meep: (value?: number) => number;
    }>();
  });

  test("reuses entries and preserves receivers", () => {
    const getter = compose.getter(
      "doubled",
      function (this: { count: number }) {
        return this.count * 2;
      },
    );

    const method = compose.method(
      "add",
      function (this: { count: number }, amount: number) {
        this.count += amount;

        return this.count;
      },
    );

    const first = compose(
      {
        count: 2,
      },
      getter,
      method,
    );

    const second = compose(
      {
        count: 10,
      },
      getter,
      method,
    );

    expect(first.add(3)).toBe(5);
    expect(first.doubled).toBe(10);
    expect(second.doubled).toBe(20);
    expect(first.add.call(second, 1)).toBe(11);
  });

  test("rejects redefinitions of non-configurable properties", () => {
    const locked = compose.property("value", {
      value: 1,
      configurable: false,
    });

    expect(() => {
      // @ts-expect-error A known non-configurable property cannot be overwritten.
      compose(locked, compose.value("value", 2));
    }).toThrow(TypeError);

    const base = defineProperty({}, "value", {
      value: 1,
    });

    expect(() => {
      return compose(base, compose.value("value", 2));
    }).toThrow(TypeError);
    expect(ownDescriptor(base, "value")?.value).toBe(1);
  });

  test("accepts only a base followed by composer entries", () => {
    if (false) {
      // @ts-expect-error Only the first argument may be a base object.
      compose({}, {});
      // @ts-expect-error A helper cannot be followed by a base object.
      compose(compose.value("value", 1), {});
    }
  });

  test("resets descriptor defaults when replacing earlier properties", () => {
    const writable = compose(
      compose.value("value", 1),
      compose.property("value", {
        value: "readonly",
      }),
    );

    const getter = compose(
      compose.property("value", {
        get() {
          return 1;
        },
        set(value: number) {},
      }),
      compose.getters({
        value() {
          return "getter";
        },
      }),
    );

    expect(ownDescriptor(writable, "value")?.writable).toBe(false);
    expect(ownDescriptor(getter, "value")?.set).toBeUndefined();
    expectTypeOf(writable).toEqualTypeOf<{ readonly value: "readonly" }>();
    expectTypeOf(getter).toEqualTypeOf<{ readonly value: string }>();
  });

  test("supports functions as base", () => {
    function baseFunction(this: any, repeat: number) {
      if (this && "str" in this) {
        return String(this.str).repeat(repeat);
      }

      return "x".repeat(repeat);
    }

    const composed = compose(
      baseFunction,
      compose.value("count", 5),
      compose.methods({
        pow2(value: number) {
          return value * value;
        },
      }),
    );

    expect(composed(3)).toBe("xxx");
    expect(
      composed.call(
        {
          str: "y",
        },
        2,
      ),
    ).toBe("yy");
    expect(composed.count).toBe(5);
    expect(composed.pow2(4)).toBe(16);
  });
});
