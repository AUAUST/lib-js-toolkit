import { AssertionError } from "#errors/AssertionError";
import { ensureArray } from "#modules/ensure/utils/ensureArray";
import { ensureArrayLike } from "#modules/ensure/utils/ensureArrayLike";
import { ensureAsyncFunction } from "#modules/ensure/utils/ensureAsyncFunction";
import { ensureAsyncGeneratorFunction } from "#modules/ensure/utils/ensureAsyncGeneratorFunction";
import { ensureBigInt } from "#modules/ensure/utils/ensureBigInt";
import { ensureBlankString } from "#modules/ensure/utils/ensureBlankString";
import { ensureBoolean } from "#modules/ensure/utils/ensureBoolean";
import { ensureCallable } from "#modules/ensure/utils/ensureCallable";
import { ensureCallableMember } from "#modules/ensure/utils/ensureCallableMember";
import { ensureConstructible } from "#modules/ensure/utils/ensureConstructible";
import { ensureContainer } from "#modules/ensure/utils/ensureContainer";
import { ensureEmptyArray } from "#modules/ensure/utils/ensureEmptyArray";
import { ensureEmptyString } from "#modules/ensure/utils/ensureEmptyString";
import { ensureFinite } from "#modules/ensure/utils/ensureFinite";
import { ensureFunction } from "#modules/ensure/utils/ensureFunction";
import { ensureGeneratorFunction } from "#modules/ensure/utils/ensureGeneratorFunction";
import { ensureInteger } from "#modules/ensure/utils/ensureInteger";
import { ensureIterable } from "#modules/ensure/utils/ensureIterable";
import { ensureMethod } from "#modules/ensure/utils/ensureMethod";
import { ensureNaN } from "#modules/ensure/utils/ensureNaN";
import { ensureNonEmptyArray } from "#modules/ensure/utils/ensureNonEmptyArray";
import { ensureNonEmptyString } from "#modules/ensure/utils/ensureNonEmptyString";
import { ensureNotArray } from "#modules/ensure/utils/ensureNotArray";
import { ensureNotBigInt } from "#modules/ensure/utils/ensureNotBigInt";
import { ensureNotBoolean } from "#modules/ensure/utils/ensureNotBoolean";
import { ensureNotFunction } from "#modules/ensure/utils/ensureNotFunction";
import { ensureNotNull } from "#modules/ensure/utils/ensureNotNull";
import { ensureNotNullish } from "#modules/ensure/utils/ensureNotNullish";
import { ensureNotNumber } from "#modules/ensure/utils/ensureNotNumber";
import { ensureNotObject } from "#modules/ensure/utils/ensureNotObject";
import { ensureNotString } from "#modules/ensure/utils/ensureNotString";
import { ensureNotSymbol } from "#modules/ensure/utils/ensureNotSymbol";
import { ensureNotUndefined } from "#modules/ensure/utils/ensureNotUndefined";
import { ensureNull } from "#modules/ensure/utils/ensureNull";
import { ensureNullish } from "#modules/ensure/utils/ensureNullish";
import { ensureNumber } from "#modules/ensure/utils/ensureNumber";
import { ensureNumeric } from "#modules/ensure/utils/ensureNumeric";
import { ensureObject } from "#modules/ensure/utils/ensureObject";
import { ensurePlainObject } from "#modules/ensure/utils/ensurePlainObject";
import { ensurePrimitive } from "#modules/ensure/utils/ensurePrimitive";
import { ensurePromise } from "#modules/ensure/utils/ensurePromise";
import { ensurePromiseLike } from "#modules/ensure/utils/ensurePromiseLike";
import { ensurePropertyComposer } from "#modules/ensure/utils/ensurePropertyComposer";
import { ensurePropertyKey } from "#modules/ensure/utils/ensurePropertyKey";
import { ensureRegisteredSymbol } from "#modules/ensure/utils/ensureRegisteredSymbol";
import { ensureSafeInteger } from "#modules/ensure/utils/ensureSafeInteger";
import { ensureScalar } from "#modules/ensure/utils/ensureScalar";
import { ensureString } from "#modules/ensure/utils/ensureString";
import { ensureSymbol } from "#modules/ensure/utils/ensureSymbol";
import { ensureUndefined } from "#modules/ensure/utils/ensureUndefined";
import { not } from "#modules/ensure/utils/not";
import { assign } from "#modules/object/utils/assign";
import type { Guard } from "#modules/ensure/internals/Guard";

export interface Ensure {
  <Candidate, Guarded>(
    guard: Guard<Guarded>,
    candidate: Candidate,
    message?: string,
  ): Candidate & Guarded;
  readonly not: typeof not;
  readonly isArray: typeof ensureArray;
  readonly isArrayLike: typeof ensureArrayLike;
  readonly isBigInt: typeof ensureBigInt;
  readonly isBlankString: typeof ensureBlankString;
  readonly isBoolean: typeof ensureBoolean;
  readonly isCallable: typeof ensureCallable;
  readonly isCallableMember: typeof ensureCallableMember;
  readonly isConstructible: typeof ensureConstructible;
  readonly isAsyncGeneratorFunction: typeof ensureAsyncGeneratorFunction;
  readonly isGeneratorFunction: typeof ensureGeneratorFunction;
  readonly isAsyncFunction: typeof ensureAsyncFunction;
  readonly isContainer: typeof ensureContainer;
  readonly isEmptyArray: typeof ensureEmptyArray;
  readonly isEmptyString: typeof ensureEmptyString;
  readonly isFinite: typeof ensureFinite;
  readonly isFunction: typeof ensureFunction;
  readonly isInteger: typeof ensureInteger;
  readonly isIterable: typeof ensureIterable;
  readonly isMethod: typeof ensureMethod;
  readonly isNaN: typeof ensureNaN;
  readonly isNonEmptyArray: typeof ensureNonEmptyArray;
  readonly isNonEmptyString: typeof ensureNonEmptyString;
  readonly isNotArray: typeof ensureNotArray;
  readonly isNotBigInt: typeof ensureNotBigInt;
  readonly isNotBoolean: typeof ensureNotBoolean;
  readonly isNotFunction: typeof ensureNotFunction;
  readonly isNotNull: typeof ensureNotNull;
  readonly isNotNullish: typeof ensureNotNullish;
  readonly isNotNumber: typeof ensureNotNumber;
  readonly isNotObject: typeof ensureNotObject;
  readonly isNotString: typeof ensureNotString;
  readonly isNotSymbol: typeof ensureNotSymbol;
  readonly isNotUndefined: typeof ensureNotUndefined;
  readonly isNull: typeof ensureNull;
  readonly isNullish: typeof ensureNullish;
  readonly isNumber: typeof ensureNumber;
  readonly isNumeric: typeof ensureNumeric;
  readonly isObject: typeof ensureObject;
  readonly isPlainObject: typeof ensurePlainObject;
  readonly isPrimitive: typeof ensurePrimitive;
  readonly isPromise: typeof ensurePromise;
  readonly isPromiseLike: typeof ensurePromiseLike;
  readonly isPropertyComposer: typeof ensurePropertyComposer;
  readonly isPropertyKey: typeof ensurePropertyKey;
  readonly isRegisteredSymbol: typeof ensureRegisteredSymbol;
  readonly isSafeInteger: typeof ensureSafeInteger;
  readonly isScalar: typeof ensureScalar;
  readonly isString: typeof ensureString;
  readonly isSymbol: typeof ensureSymbol;
  readonly isUndefined: typeof ensureUndefined;
}

/**
 * Returns the candidate when the guard passes; otherwise throws an
 * `AssertionError`. Every `ensure` helper is attached; importing it
 * bundles them all.
 */
export const ensure: Ensure = assign(
  function ensure<Candidate, Guarded>(
    guard: Guard<Guarded>,
    candidate: Candidate,
    message = "Expected the guard to pass.",
  ): Candidate & Guarded {
    if (!guard(candidate)) {
      throw new AssertionError(message);
    }

    return candidate;
  },
  {
    not,
    isArray: ensureArray,
    isArrayLike: ensureArrayLike,
    isBigInt: ensureBigInt,
    isBlankString: ensureBlankString,
    isBoolean: ensureBoolean,
    isCallable: ensureCallable,
    isCallableMember: ensureCallableMember,
    isConstructible: ensureConstructible,
    isAsyncGeneratorFunction: ensureAsyncGeneratorFunction,
    isGeneratorFunction: ensureGeneratorFunction,
    isAsyncFunction: ensureAsyncFunction,
    isContainer: ensureContainer,
    isEmptyArray: ensureEmptyArray,
    isEmptyString: ensureEmptyString,
    isFinite: ensureFinite,
    isFunction: ensureFunction,
    isInteger: ensureInteger,
    isIterable: ensureIterable,
    isMethod: ensureMethod,
    isNaN: ensureNaN,
    isNonEmptyArray: ensureNonEmptyArray,
    isNonEmptyString: ensureNonEmptyString,
    isNotArray: ensureNotArray,
    isNotBigInt: ensureNotBigInt,
    isNotBoolean: ensureNotBoolean,
    isNotFunction: ensureNotFunction,
    isNotNull: ensureNotNull,
    isNotNullish: ensureNotNullish,
    isNotNumber: ensureNotNumber,
    isNotObject: ensureNotObject,
    isNotString: ensureNotString,
    isNotSymbol: ensureNotSymbol,
    isNotUndefined: ensureNotUndefined,
    isNull: ensureNull,
    isNullish: ensureNullish,
    isNumber: ensureNumber,
    isNumeric: ensureNumeric,
    isObject: ensureObject,
    isPlainObject: ensurePlainObject,
    isPrimitive: ensurePrimitive,
    isPromise: ensurePromise,
    isPromiseLike: ensurePromiseLike,
    isPropertyComposer: ensurePropertyComposer,
    isPropertyKey: ensurePropertyKey,
    isRegisteredSymbol: ensureRegisteredSymbol,
    isSafeInteger: ensureSafeInteger,
    isScalar: ensureScalar,
    isString: ensureString,
    isSymbol: ensureSymbol,
    isUndefined: ensureUndefined,
  },
);
