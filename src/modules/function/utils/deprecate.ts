import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";
import type { CallSignature } from "#types/CallSignature";

export interface DeprecateOptions {
  /**
   * Appended to the warning, typically suggesting the replacement.
   */
  message?: string;
  /**
   * The name the warning gives the deprecated function, defaulting to its `name`;
   * keeps the warning readable on minified code.
   */
  name?: string;
}

/**
 * Wraps `closure` as `function deprecated`, which warns through `console.warn`
 * on its first call only, then forwards `this`, arguments and the result. A
 * callable `closure` is resolved once, here.
 */
export function deprecate<Closure extends Callee>(
  closure: Closure,
  options: DeprecateOptions = {},
): CallSignature<Closure> {
  const resolve = toFunction(closure);
  const name = options.name ?? resolve.name;

  const message = options.message === undefined
    ? `${name} is deprecated.`
    : `${name} is deprecated. ${options.message}`;

  let warned = false;

  return function deprecated(this: unknown, ...args: unknown[]): unknown {
    if (!warned) {
      warned = true;
      console.warn(message);
    }

    return Reflect.apply(resolve, this, args);
  } as CallSignature<Closure>;
}
