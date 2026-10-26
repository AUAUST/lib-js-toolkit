import { PipelineError } from "@auaust/toolkit/errors";
import { isArray } from "@auaust/toolkit/isArray";
import { isBoolean } from "@auaust/toolkit/isBoolean";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { Callee } from "@auaust/toolkit/types";

export type TransformFn<This, In, Out> = Callee<Out, [value: In], This>;

export type PipeCondition<This, In> =
  boolean | Callee<boolean, [value: In], This>;

export type PipeEntry<This, In, Out> =
  | TransformFn<This, In, Out>
  | [when: PipeCondition<This, In>, then: TransformFn<This, In, Out>];

export function pipe(): <This, T>(this: This, value: T) => T;
export function pipe<This, A, B>(
  fn: PipeEntry<This, A, B>,
): (this: This, value: A) => B;
export function pipe<This, A, B, C>(
  fn1: PipeEntry<This, A, B>,
  fn2: PipeEntry<This, B, C>,
): (this: This, value: A) => C;
export function pipe<This, A, B, C, D>(
  fn1: PipeEntry<This, A, B>,
  fn2: PipeEntry<This, B, C>,
  fn3: PipeEntry<This, C, D>,
): (this: This, value: A) => D;
export function pipe<This, A, B, C, D, E>(
  fn1: PipeEntry<This, A, B>,
  fn2: PipeEntry<This, B, C>,
  fn3: PipeEntry<This, C, D>,
  fn4: PipeEntry<This, D, E>,
): (this: This, value: A) => E;
export function pipe<This, A, B, C, D, E, F>(
  fn1: PipeEntry<This, A, B>,
  fn2: PipeEntry<This, B, C>,
  fn3: PipeEntry<This, C, D>,
  fn4: PipeEntry<This, D, E>,
  fn5: PipeEntry<This, E, F>,
): (this: This, value: A) => F;
export function pipe<This, A, B, C, D, E, F, G>(
  fn1: PipeEntry<This, A, B>,
  fn2: PipeEntry<This, B, C>,
  fn3: PipeEntry<This, C, D>,
  fn4: PipeEntry<This, D, E>,
  fn5: PipeEntry<This, E, F>,
  fn6: PipeEntry<This, F, G>,
): (this: This, value: A) => G;
export function pipe<This, A, B, C, D, E, F, G, H>(
  fn1: PipeEntry<This, A, B>,
  fn2: PipeEntry<This, B, C>,
  fn3: PipeEntry<This, C, D>,
  fn4: PipeEntry<This, D, E>,
  fn5: PipeEntry<This, E, F>,
  fn6: PipeEntry<This, F, G>,
  fn7: PipeEntry<This, G, H>,
): (this: This, value: A) => H;
export function pipe<This, A, B, C, D, E, F, G, H, I>(
  fn1: PipeEntry<This, A, B>,
  fn2: PipeEntry<This, B, C>,
  fn3: PipeEntry<This, C, D>,
  fn4: PipeEntry<This, D, E>,
  fn5: PipeEntry<This, E, F>,
  fn6: PipeEntry<This, F, G>,
  fn7: PipeEntry<This, G, H>,
  fn8: PipeEntry<This, H, I>,
): (this: This, value: A) => I;
export function pipe<This>(
  ...fns: PipeEntry<This, any, any>[]
): (this: This, value: any) => any;
export function pipe(this: any, ...callbacks: PipeEntry<any, any, any>[]) {
  const resolved = callbacks.map((entry) => {
    if (isArray(entry)) {
      const [condition, callback] = entry;

      return {
        condition: isBoolean(condition)
          ? condition
          : resolveCallable(condition),
        callback: resolveCallable(callback),
        original: callback,
      };
    }

    return {
      condition: true,
      callback: resolveCallable(entry),
      original: entry,
    };
  });

  return function pipe(this: any, initialValue: unknown) {
    return resolved.reduce((carry, entry, step) => {
      const { condition, callback, original } = entry;

      const shouldRun = isBoolean(condition)
        ? condition
        : condition.call(this, carry);

      if (!shouldRun) {
        return carry;
      }

      try {
        return callback.call(this, carry);
      } catch (error) {
        throw new PipelineError({
          fn: original,
          step,
          input: carry,
          thisValue: this,
          cause: error,
        });
      }
    }, initialValue);
  };
}
