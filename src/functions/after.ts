import { apply } from "@auaust/toolkit/apply";
import type { MaybePromise } from "@auaust/toolkit/types";

export function after<Result, Arguments extends any[], This>(
  this: This,
  callback: (this: This, ...args: Arguments) => MaybePromise<Result>,
  delay: number,
  ...args: Arguments
): Promise<Result> {
  return new Promise((resolve) => {
    void setTimeout(() => {
      void resolve(apply.call(this, callback, args));
    }, delay);
  });
}
