import { type ResolvedValue, value } from "~/functions/value";

export function on<const Result, const Arguments extends any[], This = any>(
  this: This,
  ...args: [
    ...Arguments,
    callback: (
      this: This,
      ...args: NoInfer<{
        [Index in keyof Arguments]: ResolvedValue<Arguments[Index]>;
      }>
    ) => Result,
  ]
): Result;
export function on(this: any, ...args: any[]): any {
  return args.pop().apply(this, args.map(value.bind(this)));
}
