import { apply } from "@auaust/toolkit/apply";
import type { AsyncCallee } from "@auaust/toolkit/types";

export function after<Result, Arguments extends readonly any[], This>(
  this: This,
  callback: AsyncCallee<Result, Arguments, This>,
  delay: number,
  ...args: Arguments
): Promise<Result> {
  return new Promise((resolve) => {
    void setTimeout(() => {
      void resolve(apply.call(this, callback, args));
    }, delay);
  });
}
