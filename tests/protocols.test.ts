import { empty, value as resolve } from "@auaust/toolkit";
import {
  type DefineProtocol,
  implementsProtocol,
} from "@auaust/toolkit/protocols";
import { type Emptiable, isEmpty } from "@auaust/toolkit/protocols/emptiable";
import { describe, expect, expectTypeOf, test } from "vitest";

const customProtocol: unique symbol = Symbol("customProtocol");

interface CustomImplementation {
  [customProtocol]: string;
}

declare module "@auaust/toolkit/protocols" {
  interface ProtocolRegistry extends DefineProtocol<
    typeof customProtocol,
    CustomImplementation
  > {}
}

describe("protocols", () => {
  test("recognizes and narrows built-in protocols", () => {
    const value: unknown = {
      [isEmpty]: () => true,
    };

    expect(implementsProtocol(isEmpty, value)).toBe(true);

    if (implementsProtocol(isEmpty, value)) {
      expectTypeOf(value).toEqualTypeOf<Emptiable>();

      const typed = value[isEmpty];

      expectTypeOf(typed).toEqualTypeOf<(() => boolean) | boolean>();

      expect(resolve(typed)).toBe(true);
    }

    expect(empty(value)).toBe(true);
  });

  test("supports externally registered protocols", () => {
    const value: unknown = {
      [customProtocol]: "implemented",
    };

    expect(implementsProtocol(customProtocol, value)).toBe(true);

    if (implementsProtocol(customProtocol, value)) {
      const typed = value[customProtocol];

      expectTypeOf(value).toEqualTypeOf<CustomImplementation>();

      expect(typed).toBe("implemented");

      expectTypeOf(typed).toEqualTypeOf<string>();
    }
  });

  test("narrows synchronous and asynchronous iteration protocols", () => {
    const iterable: unknown = [1, 2, 3];
    const asyncIterable: unknown = (async function* () {
      yield 1;
    })();

    if (implementsProtocol(Symbol.iterator, iterable)) {
      expectTypeOf(iterable).toEqualTypeOf<Iterable<any>>();
      expect([...iterable]).toEqual([1, 2, 3]);
    } else {
      expect.unreachable("The array should implement Symbol.iterator.");
    }

    if (implementsProtocol(Symbol.asyncIterator, asyncIterable)) {
      expectTypeOf(asyncIterable).toEqualTypeOf<AsyncIterable<any>>();
      expectTypeOf(asyncIterable[Symbol.asyncIterator]).toBeFunction();
    } else {
      expect.unreachable(
        "The async generator should implement Symbol.asyncIterator.",
      );
    }
  });

  test("narrows synchronous and asynchronous disposal protocols", () => {
    const disposable: unknown = { [Symbol.dispose]() {} };
    const asyncDisposable: unknown = { async [Symbol.asyncDispose]() {} };

    if (implementsProtocol(Symbol.dispose, disposable)) {
      expectTypeOf(disposable).toEqualTypeOf<Disposable>();
      expectTypeOf(disposable[Symbol.dispose]).toEqualTypeOf<() => void>();
    } else {
      expect.unreachable("The value should implement Symbol.dispose.");
    }

    if (implementsProtocol(Symbol.asyncDispose, asyncDisposable)) {
      expectTypeOf(asyncDisposable).toEqualTypeOf<AsyncDisposable>();
      expectTypeOf(asyncDisposable[Symbol.asyncDispose]).toEqualTypeOf<
        () => PromiseLike<void>
      >();
    } else {
      expect.unreachable("The value should implement Symbol.asyncDispose.");
    }
  });

  test("narrows language operator protocols", () => {
    const instanceChecker: unknown = {
      [Symbol.hasInstance]: (value: any) => value === 42,
    };
    const spreadable: unknown = { [Symbol.isConcatSpreadable]: true };
    const primitiveConvertible: unknown = {
      [Symbol.toPrimitive]: () => 42,
    };

    if (implementsProtocol(Symbol.hasInstance, instanceChecker)) {
      expectTypeOf(instanceChecker[Symbol.hasInstance]).toEqualTypeOf<
        (value: any) => boolean
      >();
      expect(instanceChecker[Symbol.hasInstance](42)).toBe(true);
    }

    if (implementsProtocol(Symbol.isConcatSpreadable, spreadable)) {
      expectTypeOf(
        spreadable[Symbol.isConcatSpreadable],
      ).toEqualTypeOf<boolean>();
      expect(spreadable[Symbol.isConcatSpreadable]).toBe(true);
    }

    if (implementsProtocol(Symbol.toPrimitive, primitiveConvertible)) {
      expectTypeOf(
        primitiveConvertible[Symbol.toPrimitive],
      ).returns.toEqualTypeOf<
        bigint | boolean | null | number | string | symbol | undefined
      >();
      expect(primitiveConvertible[Symbol.toPrimitive]("number")).toBe(42);
    }
  });

  test("narrows string pattern protocols", () => {
    const pattern: unknown = {
      [Symbol.match]: (_string: string) => null,
      [Symbol.matchAll]: function* (_string: string) {},
      [Symbol.replace]: (string: string) => string,
      [Symbol.search]: (_string: string) => -1,
      [Symbol.split]: (string: string) => [string],
    };

    if (implementsProtocol(Symbol.match, pattern)) {
      expectTypeOf(
        pattern[Symbol.match],
      ).returns.toEqualTypeOf<RegExpMatchArray | null>();
    }

    if (implementsProtocol(Symbol.matchAll, pattern)) {
      expectTypeOf(pattern[Symbol.matchAll]).returns.toEqualTypeOf<
        IterableIterator<RegExpMatchArray>
      >();
    }

    if (implementsProtocol(Symbol.replace, pattern)) {
      expectTypeOf(pattern[Symbol.replace]).returns.toEqualTypeOf<string>();
    }

    if (implementsProtocol(Symbol.search, pattern)) {
      expectTypeOf(pattern[Symbol.search]).returns.toEqualTypeOf<number>();
    }

    if (implementsProtocol(Symbol.split, pattern)) {
      expectTypeOf(pattern[Symbol.split]).returns.toEqualTypeOf<string[]>();
    }
  });

  test("narrows metadata protocols", () => {
    const species: unknown = { [Symbol.species]: Array };
    const tagged: unknown = { [Symbol.toStringTag]: "Tagged" };
    const scoped: unknown = { [Symbol.unscopables]: { hidden: true } };

    if (implementsProtocol(Symbol.species, species)) {
      expectTypeOf(species[Symbol.species]).toEqualTypeOf<Function | null>();
      expect(species[Symbol.species]).toBe(Array);
    }

    if (implementsProtocol(Symbol.toStringTag, tagged)) {
      expectTypeOf(tagged[Symbol.toStringTag]).toEqualTypeOf<string>();
      expect(tagged[Symbol.toStringTag]).toBe("Tagged");
    }

    if (implementsProtocol(Symbol.unscopables, scoped)) {
      expectTypeOf(scoped[Symbol.unscopables]).toEqualTypeOf<object>();
      expect(scoped[Symbol.unscopables]).toEqual({ hidden: true });
    }
  });

  test("recognizes inherited well-known protocols", () => {
    expect(implementsProtocol(Symbol.iterator, [])).toBe(true);
    expect(implementsProtocol(Symbol.match, /pattern/)).toBe(true);
    expect(implementsProtocol(Symbol.toStringTag, JSON)).toBe(true);
    expect(implementsProtocol(Symbol.hasInstance, Function)).toBe(true);
  });

  test("rejects missing protocols and primitive values", () => {
    expect(implementsProtocol(isEmpty, {})).toBe(false);
    expect(implementsProtocol(isEmpty, null)).toBe(false);
    expect(implementsProtocol(isEmpty, "value")).toBe(false);
    expect(implementsProtocol(Symbol.iterator, {})).toBe(false);
    expect(implementsProtocol(Symbol.iterator, "iterable primitive")).toBe(
      false,
    );
  });
});
