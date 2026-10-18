import { apply } from "@auaust/toolkit/apply";
import { type ResolvedValue, value } from "@auaust/toolkit/value";
import type { Callee } from "@auaust/toolkit/types";

export function on<Return, Arguments extends readonly any[], This = any>(
  this: This,
  ...args: [
    ...Arguments,
    callback: Callee<
      Return,
      NoInfer<[
        ...{
          [Index in keyof Arguments]: ResolvedValue<Arguments[Index]>;
        },
      ]>,
      This
    >,
  ]
): Return;
export function on(this: any, ...args: any[]): any {
  const callback = args.pop();
  const resolvedArgs = args.map(value.bind(this));

  return apply.call(this, callback, resolvedArgs);
}
