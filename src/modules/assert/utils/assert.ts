import { AssertionError } from "#errors/AssertionError";
import { assertArray } from "#modules/assert/utils/assertArray";
import { assertBigInt } from "#modules/assert/utils/assertBigInt";
import { assertBoolean } from "#modules/assert/utils/assertBoolean";
import { assertCallable } from "#modules/assert/utils/assertCallable";
import { assertCallableMember } from "#modules/assert/utils/assertCallableMember";
import { assertContainer } from "#modules/assert/utils/assertContainer";
import { assertFinite } from "#modules/assert/utils/assertFinite";
import { assertFunction } from "#modules/assert/utils/assertFunction";
import { assertInteger } from "#modules/assert/utils/assertInteger";
import { assertIterable } from "#modules/assert/utils/assertIterable";
import { assertMethod } from "#modules/assert/utils/assertMethod";
import { assertNaN } from "#modules/assert/utils/assertNaN";
import { assertNotArray } from "#modules/assert/utils/assertNotArray";
import { assertNotBigInt } from "#modules/assert/utils/assertNotBigInt";
import { assertNotBoolean } from "#modules/assert/utils/assertNotBoolean";
import { assertNotFunction } from "#modules/assert/utils/assertNotFunction";
import { assertNotNull } from "#modules/assert/utils/assertNotNull";
import { assertNotNullish } from "#modules/assert/utils/assertNotNullish";
import { assertNotNumber } from "#modules/assert/utils/assertNotNumber";
import { assertNotObject } from "#modules/assert/utils/assertNotObject";
import { assertNotString } from "#modules/assert/utils/assertNotString";
import { assertNotSymbol } from "#modules/assert/utils/assertNotSymbol";
import { assertNotUndefined } from "#modules/assert/utils/assertNotUndefined";
import { assertNull } from "#modules/assert/utils/assertNull";
import { assertNullish } from "#modules/assert/utils/assertNullish";
import { assertNumber } from "#modules/assert/utils/assertNumber";
import { assertObject } from "#modules/assert/utils/assertObject";
import { assertPlainObject } from "#modules/assert/utils/assertPlainObject";
import { assertPromise } from "#modules/assert/utils/assertPromise";
import { assertPromiseLike } from "#modules/assert/utils/assertPromiseLike";
import { assertPropertyComposer } from "#modules/assert/utils/assertPropertyComposer";
import { assertPropertyKey } from "#modules/assert/utils/assertPropertyKey";
import { assertRegisteredSymbol } from "#modules/assert/utils/assertRegisteredSymbol";
import { assertSafeInteger } from "#modules/assert/utils/assertSafeInteger";
import { assertString } from "#modules/assert/utils/assertString";
import { assertSymbol } from "#modules/assert/utils/assertSymbol";
import { assertUndefined } from "#modules/assert/utils/assertUndefined";
import { not } from "#modules/assert/utils/not";
import { assign } from "#modules/object/utils/assign";

export interface Assert {
  (condition: unknown, message?: string): asserts condition;
  readonly not: typeof not;
  readonly isArray: typeof assertArray;
  readonly isBigInt: typeof assertBigInt;
  readonly isBoolean: typeof assertBoolean;
  readonly isCallable: typeof assertCallable;
  readonly isCallableMember: typeof assertCallableMember;
  readonly isContainer: typeof assertContainer;
  readonly isFinite: typeof assertFinite;
  readonly isFunction: typeof assertFunction;
  readonly isInteger: typeof assertInteger;
  readonly isIterable: typeof assertIterable;
  readonly isMethod: typeof assertMethod;
  readonly isNaN: typeof assertNaN;
  readonly isNotArray: typeof assertNotArray;
  readonly isNotBigInt: typeof assertNotBigInt;
  readonly isNotBoolean: typeof assertNotBoolean;
  readonly isNotFunction: typeof assertNotFunction;
  readonly isNotNull: typeof assertNotNull;
  readonly isNotNullish: typeof assertNotNullish;
  readonly isNotNumber: typeof assertNotNumber;
  readonly isNotObject: typeof assertNotObject;
  readonly isNotString: typeof assertNotString;
  readonly isNotSymbol: typeof assertNotSymbol;
  readonly isNotUndefined: typeof assertNotUndefined;
  readonly isNull: typeof assertNull;
  readonly isNullish: typeof assertNullish;
  readonly isNumber: typeof assertNumber;
  readonly isObject: typeof assertObject;
  readonly isPlainObject: typeof assertPlainObject;
  readonly isPromise: typeof assertPromise;
  readonly isPromiseLike: typeof assertPromiseLike;
  readonly isPropertyComposer: typeof assertPropertyComposer;
  readonly isPropertyKey: typeof assertPropertyKey;
  readonly isRegisteredSymbol: typeof assertRegisteredSymbol;
  readonly isSafeInteger: typeof assertSafeInteger;
  readonly isString: typeof assertString;
  readonly isSymbol: typeof assertSymbol;
  readonly isUndefined: typeof assertUndefined;
}

/**
 * @throws {AssertionError} when the condition is falsy; every assertion is attached. Importing it bundles them all.
 */
export const assert: Assert = assign<
  (condition: unknown, message?: string) => asserts condition,
  [Omit<Assert, never>]
>(
  function assert(
    condition: unknown,
    message = "Assertion failed.",
  ): asserts condition {
    if (!condition) {
      throw new AssertionError(message);
    }
  },
  {
    not,
    isArray: assertArray,
    isBigInt: assertBigInt,
    isBoolean: assertBoolean,
    isCallable: assertCallable,
    isCallableMember: assertCallableMember,
    isContainer: assertContainer,
    isFinite: assertFinite,
    isFunction: assertFunction,
    isInteger: assertInteger,
    isIterable: assertIterable,
    isMethod: assertMethod,
    isNaN: assertNaN,
    isNotArray: assertNotArray,
    isNotBigInt: assertNotBigInt,
    isNotBoolean: assertNotBoolean,
    isNotFunction: assertNotFunction,
    isNotNull: assertNotNull,
    isNotNullish: assertNotNullish,
    isNotNumber: assertNotNumber,
    isNotObject: assertNotObject,
    isNotString: assertNotString,
    isNotSymbol: assertNotSymbol,
    isNotUndefined: assertNotUndefined,
    isNull: assertNull,
    isNullish: assertNullish,
    isNumber: assertNumber,
    isObject: assertObject,
    isPlainObject: assertPlainObject,
    isPromise: assertPromise,
    isPromiseLike: assertPromiseLike,
    isPropertyComposer: assertPropertyComposer,
    isPropertyKey: assertPropertyKey,
    isRegisteredSymbol: assertRegisteredSymbol,
    isSafeInteger: assertSafeInteger,
    isString: assertString,
    isSymbol: assertSymbol,
    isUndefined: assertUndefined,
  },
);
