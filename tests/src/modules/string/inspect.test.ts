import { expect, test } from "vitest";

import { inspect } from "@auaust/toolkit/string";

test("renders values with their types", () => {
  class Foo {
    a = 1;
  }

  expect(inspect(undefined)).toBe("undefined");
  expect(inspect(null)).toBe("null");
  expect(inspect(-0)).toBe("-0");
  expect(inspect(10n)).toBe("10n");
  expect(inspect('a"b')).toBe('"a\\"b"');

  expect(
    inspect({
      "a": 1,
      "b-c": 2,
      [Symbol("x")]: 3,
    }),
  ).toBe('{ a: 1, "b-c": 2, [Symbol(x)]: 3 }');

  expect(inspect(new Foo())).toBe("Foo { a: 1 }");
  expect(inspect(new Map([["a", 1]]))).toBe('Map(1) { "a" => 1 }');
  expect(inspect(new Uint8Array([1, 2, 3]))).toBe("Uint8Array(3) [1, 2, 3]");
  expect(inspect(new Date(Number.NaN))).toBe("Date(Invalid)");
  expect(inspect(/a/g)).toBe("/a/g");
  expect(inspect(new TypeError("bad"))).toBe("TypeError: bad");

  expect(
    inspect({
      a: {
        b: {
          c: { d: 1 },
        },
      },
    }),
  ).toBe("{ a: { b: { c: Object } } }");

  expect(inspect("abcdef", { maxStringLength: 2 })).toBe('"ab..." (+4 chars)');
});

test("never fails", () => {
  const getter = {
    get a(): never {
      throw new Error("ran");
    },
  };

  const { proxy, revoke } = Proxy.revocable({}, {});
  const circular: Record<string, unknown> = {};

  circular.self = circular;

  revoke();

  const throwing = new Proxy(
    {},
    {
      ownKeys() {
        throw new Error("trap");
      },
    },
  );

  expect(inspect(getter)).toBe("{ a: [Getter] }");
  expect(inspect(proxy)).toBe("Proxy (revoked)");
  expect(inspect(circular)).toBe("{ self: [Circular] }");
  expect(inspect(throwing)).toBe("[Uninspectable]");
});

test("skips items past the limit", () => {
  expect(inspect(["a", 1, new Map(), 4, 5], { maxItems: 3 })).toBe(
    '["a", 1, Map(0) {}, ...skipped 2]',
  );
});
