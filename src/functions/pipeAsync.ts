import { PipelineError } from "~/errors/PipelineError";
import type { PipeCondition } from "./pipe";

export type AsyncTransformFn<This, In, Out> =
  | ((this: This, value: In) => Promise<Out> | Out)
  | ((value: In) => Promise<Out> | Out);

export type AsyncPipeEntry<This, In, Out> =
  | AsyncTransformFn<This, In, Out>
  | [when: PipeCondition<This, In>, then: AsyncTransformFn<This, In, Out>];

export function pipeAsync(): <This, T>(this: This, value: T) => Promise<T>;
export function pipeAsync<This, A, B>(
  fn: AsyncPipeEntry<This, A, B>
): (this: This, value: A) => Promise<B>;
export function pipeAsync<This, A, B, C>(
  fn1: AsyncPipeEntry<This, A, B>,
  fn2: AsyncPipeEntry<This, B, C>
): (this: This, value: A) => Promise<C>;
export function pipeAsync<This, A, B, C, D>(
  fn1: AsyncPipeEntry<This, A, B>,
  fn2: AsyncPipeEntry<This, B, C>,
  fn3: AsyncPipeEntry<This, C, D>
): (this: This, value: A) => Promise<D>;
export function pipeAsync<This, A, B, C, D, E>(
  fn1: AsyncPipeEntry<This, A, B>,
  fn2: AsyncPipeEntry<This, B, C>,
  fn3: AsyncPipeEntry<This, C, D>,
  fn4: AsyncPipeEntry<This, D, E>
): (this: This, value: A) => Promise<E>;
export function pipeAsync<This, A, B, C, D, E, F>(
  fn1: AsyncPipeEntry<This, A, B>,
  fn2: AsyncPipeEntry<This, B, C>,
  fn3: AsyncPipeEntry<This, C, D>,
  fn4: AsyncPipeEntry<This, D, E>,
  fn5: AsyncPipeEntry<This, E, F>
): (this: This, value: A) => Promise<F>;
export function pipeAsync<This, A, B, C, D, E, F, G>(
  fn1: AsyncPipeEntry<This, A, B>,
  fn2: AsyncPipeEntry<This, B, C>,
  fn3: AsyncPipeEntry<This, C, D>,
  fn4: AsyncPipeEntry<This, D, E>,
  fn5: AsyncPipeEntry<This, E, F>,
  fn6: AsyncPipeEntry<This, F, G>
): (this: This, value: A) => Promise<G>;
export function pipeAsync<This, A, B, C, D, E, F, G, H>(
  fn1: AsyncPipeEntry<This, A, B>,
  fn2: AsyncPipeEntry<This, B, C>,
  fn3: AsyncPipeEntry<This, C, D>,
  fn4: AsyncPipeEntry<This, D, E>,
  fn5: AsyncPipeEntry<This, E, F>,
  fn6: AsyncPipeEntry<This, F, G>,
  fn7: AsyncPipeEntry<This, G, H>
): (this: This, value: A) => Promise<H>;
export function pipeAsync<This, A, B, C, D, E, F, G, H, I>(
  fn1: AsyncPipeEntry<This, A, B>,
  fn2: AsyncPipeEntry<This, B, C>,
  fn3: AsyncPipeEntry<This, C, D>,
  fn4: AsyncPipeEntry<This, D, E>,
  fn5: AsyncPipeEntry<This, E, F>,
  fn6: AsyncPipeEntry<This, F, G>,
  fn7: AsyncPipeEntry<This, G, H>,
  fn8: AsyncPipeEntry<This, H, I>
): (this: This, value: A) => Promise<I>;
export function pipeAsync<This>(
  ...fns: AsyncPipeEntry<This, any, any>[]
): (this: This, value: any) => Promise<any>;
export function pipeAsync(this: any, ...fns: AsyncPipeEntry<any, any, any>[]) {
  return async function (this: any, initialValue: unknown) {
    let carry = initialValue;

    for (let step = 0; step < fns.length; step++) {
      const entry = fns[step];

      let fn: AsyncTransformFn<any, unknown, unknown>;

      if (Array.isArray(entry)) {
        const [condition, func] = entry;

        if (
          typeof condition === "function"
            ? condition.call(this, carry)
            : condition
        ) {
          fn = func;
        } else {
          continue;
        }
      } else {
        fn = entry;
      }

      try {
        carry = await fn.call(this, carry);
      } catch (error) {
        throw new PipelineError({
          fn,
          step,
          input: carry,
          thisValue: this,
          cause: error,
        });
      }
    }

    return carry;
  };
}
