import { AssertionError } from "#errors/AssertionError";
import { ensureArray } from "#modules/ensure/utils/ensureArray";
import { ensureBigInt } from "#modules/ensure/utils/ensureBigInt";
import { ensureBoolean } from "#modules/ensure/utils/ensureBoolean";
import { ensureCallable } from "#modules/ensure/utils/ensureCallable";
import { ensureContainer } from "#modules/ensure/utils/ensureContainer";
import { ensureFinite } from "#modules/ensure/utils/ensureFinite";
import { ensureFunction } from "#modules/ensure/utils/ensureFunction";
import { ensureInteger } from "#modules/ensure/utils/ensureInteger";
import { ensureNaN } from "#modules/ensure/utils/ensureNaN";
import { ensureNotBigInt } from "#modules/ensure/utils/ensureNotBigInt";
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
import { ensureObject } from "#modules/ensure/utils/ensureObject";
import { ensurePlainObject } from "#modules/ensure/utils/ensurePlainObject";
import { ensurePromise } from "#modules/ensure/utils/ensurePromise";
import { ensurePromiseLike } from "#modules/ensure/utils/ensurePromiseLike";
import { ensurePropertyComposer } from "#modules/ensure/utils/ensurePropertyComposer";
import { ensurePropertyKey } from "#modules/ensure/utils/ensurePropertyKey";
import { ensureRegisteredSymbol } from "#modules/ensure/utils/ensureRegisteredSymbol";
import { ensureSafeInteger } from "#modules/ensure/utils/ensureSafeInteger";
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
  readonly isBigInt: typeof ensureBigInt;
  readonly isBoolean: typeof ensureBoolean;
  readonly isCallable: typeof ensureCallable;
  readonly isContainer: typeof ensureContainer;
  readonly isFinite: typeof ensureFinite;
  readonly isFunction: typeof ensureFunction;
  readonly isInteger: typeof ensureInteger;
  readonly isNaN: typeof ensureNaN;
  readonly isNotBigInt: typeof ensureNotBigInt;
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
  readonly isObject: typeof ensureObject;
  readonly isPlainObject: typeof ensurePlainObject;
  readonly isPromise: typeof ensurePromise;
  readonly isPromiseLike: typeof ensurePromiseLike;
  readonly isPropertyComposer: typeof ensurePropertyComposer;
  readonly isPropertyKey: typeof ensurePropertyKey;
  readonly isRegisteredSymbol: typeof ensureRegisteredSymbol;
  readonly isSafeInteger: typeof ensureSafeInteger;
  readonly isString: typeof ensureString;
  readonly isSymbol: typeof ensureSymbol;
  readonly isUndefined: typeof ensureUndefined;
}

/**
 * Returns the candidate when the guard passes; otherwise throws an `AssertionError`. Every `ensure` helper is attached; importing it bundles them all.
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
    isBigInt: ensureBigInt,
    isBoolean: ensureBoolean,
    isCallable: ensureCallable,
    isContainer: ensureContainer,
    isFinite: ensureFinite,
    isFunction: ensureFunction,
    isInteger: ensureInteger,
    isNaN: ensureNaN,
    isNotBigInt: ensureNotBigInt,
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
    isObject: ensureObject,
    isPlainObject: ensurePlainObject,
    isPromise: ensurePromise,
    isPromiseLike: ensurePromiseLike,
    isPropertyComposer: ensurePropertyComposer,
    isPropertyKey: ensurePropertyKey,
    isRegisteredSymbol: ensureRegisteredSymbol,
    isSafeInteger: ensureSafeInteger,
    isString: ensureString,
    isSymbol: ensureSymbol,
    isUndefined: ensureUndefined,
  },
);
