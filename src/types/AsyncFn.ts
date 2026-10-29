import type { MaybePromise } from "#types/MaybePromise";

export type AsyncFn<
  Return = any,
  Arguments extends readonly any[] = any[],
  This = any,
> = (this: This, ...args: Arguments) => MaybePromise<Return>;
